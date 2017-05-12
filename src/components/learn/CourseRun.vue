<template>
  <div>
    <progress-header-bar></progress-header-bar>
    <iframe
      :src="urlLearn"
      id="declick-client-learn"
      class="fullscreen-iframe2"
      v-if="!offline"
    ></iframe>
    <webview
      :src="webviewUrl"
      v-else
      nodeintegration 
      disablewebsecurity 
      :data-hash="urlLearn"
      class="fullscreen-iframe2"
      ref='learnWebview'>
  </div>
</template>

<script>
import config from 'assets/config/declick'
import Channel from 'exports-loader?Channel!jschannel/src/jschannel.js'
import {mapState, mapActions} from 'vuex'
import Remote from 'src/api'
import Storage from 'src/storage'
import {EventBus} from 'src/eventBus'

let Api

if (config.offline) {
  Api = Storage
} else {
  Api = Remote
}

import ProgressHeaderBar from '../learn/ProgressHeaderBar'

window.Channel = Channel
import pem from 'exports-loader?TaskProxyManager&Platform!pem-platform/task-xd-pr.js'
var task = false
let learnFrame

export default {
  data () {
    return {
      offline: config.offline,
      webviewUrl: config.clientUrl + "learn_offline.html"
    }
  },
  methods: {
    ...mapActions(['selectNextAssessment', 'registerCurrentAssessmentResult'])
  },
  computed: {
    urlLearn () {
      let value
      if (this.currentAssessment) {
        if (this.currentAssessment.url) {
          value = this.currentAssessment.url + '&token=' + this.token + '&channelId=declick'
        } else {
          // chapter
          this.$router.push({name: 'map', params: {id: this.$route.params.id}})
          value = config.clientUrl + 'learn.html#token=' + this.token + '&channelId=declick'
        }
      } else {
        value = config.clientUrl + 'learn.html#token=' + this.token + '&channelId=declick'
      }
      if (this.offline && learnFrame) {
        learnFrame.send('updateHash', value)
      }
      return value
    },
    ...mapState(['currentAssessment', 'token'])
  },
  mounted () {
    var self = this
    if (!this.offline) {
      pem.Platform.prototype.showView = function (views, success, error) {
        if (self.currentAssessment && self.currentAssessment.solution) {
          task.reloadAnswer(self.currentAssessment.solution, () => {
            success()
          })
        } else {
          success()
        }
      }

      pem.Platform.prototype.openUrl = function (url, success, error) {
        if (url.name && url.name === 'import' && url.id) {
          // special case to import a project
          Api.importProject(url.id, self.token).then(() => {
            EventBus.$emit('initCreate')
            success()
          }, error)
        } else {
          self.$router.push(url, success, error)
        }
      }

      pem.Platform.prototype.validate = function (mode, success, error) {
        if (mode === 'nextOnly') {
          self.selectNextAssessment()
        } else {
          task.getAnswer(async answer => {
            await self.registerCurrentAssessmentResult({
              passed: true,
              solution: answer
            })
            if (mode === 'nextImmediate') {
              // wait for all watchers to be triggered
              self.$nextTick(() => {
                self.selectNextAssessment()
              })
            }
          })
        }
        success()
      }
      var iframe = document.getElementById('declick-client-learn')
      var initProxy = function () {
        pem.TaskProxyManager.getTaskProxy('declick-client-learn', ref => {
          task = ref
          pem.TaskProxyManager.setPlatform(task, new pem.Platform(task))
        })
        iframe.removeEventListener('load', initProxy)
      }
      iframe.addEventListener('load', initProxy)
    } else {
      let element = this.$refs.learnWebview
      let callbacks = []
      let callbackCount = 0
      let registerCallback = function (callback) {
        callbacks[callbackCount] = callback
        callbackCount++
        return callbackCount - 1
      }
      element.addEventListener('did-finish-load', () => {
        element.send('updateHash', this.urlLearn)
        learnFrame = element
      })
      element.addEventListener('ipc-message', (event) => {
        if (event.channel === 'declick') {
          let message = event.args[0]
          switch (message.type) {
            case "validate":
              let mode = message.mode
              if (mode === 'nextOnly') {
                self.selectNextAssessment()
              } else {
                element.send('declick', {
                  type: 'getAnswer',
                  callback: registerCallback((answer) => {
                    self.registerCurrentAssessmentResult({
                      passed: true,
                      solution: answer
                    }).then(() => {
                      if (mode === 'nextImmediate') {
                        // wait for all watchers to be triggered
                        self.$nextTick(() => {
                          self.selectNextAssessment()
                        })
                      }
                    })
                  })
                })
              }
              break
            case "callback":
              if (callbacks[message.callback]) {
                callbacks[message.callback].call(this, message.data)
                delete callbacks[message.callback]
              }
              break
            case "showView":
              if (self.currentAssessment && self.currentAssessment.solution) {
                element.send('declick', {
                  type: 'reloadAnswer',
                  data: self.currentAssessment.solution,
                  callback: registerCallback(() => {
                    element.send('declick', {type: 'callback', callback: message.callback})
                  })
                })
              } else {
                element.send('declick', {type: 'callback', callback: message.callback})
              }
              break
            case "openUrl":
              if (message.url.name && message.url.name === 'import' && message.url.id) {
                // special case to import a project
                Api.importProject(message.url.id, self.token)
                EventBus.$emit('initCreate')
                element.send('declick', {type: 'callback', callback: message.callback})
              } else {
                self.$router.push(message.url, () => {
                  element.send('declick', {type: 'callback', callback: message.callback})
                })
              }
              break
          }
        }
      })
    }
  },
  components: {
    ProgressHeaderBar
  }
}

</script>
<style lang="css">
.fullscreen-iframe2 {
  height: calc(100vh - 60px);
  width: 100%;
  border: none;
  overflow:hidden;
}
</style>