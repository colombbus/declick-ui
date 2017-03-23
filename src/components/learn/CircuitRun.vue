<template>
  <div>
    <progress-small-nav-bar></progress-small-nav-bar>
    <iframe
      :src="urlLearn"
      id="declick-client-learn"
      class="fullscreen-iframe2"
    ></iframe>
  </div>
</template>

<script>
import config from 'assets/config/declick'
import Channel from 'exports-loader?Channel!jschannel/src/jschannel.js'
import { mapState, mapActions, mapMutations } from 'vuex'

import * as mutations from '../../store/mutation-types.js'

import ProgressSmallNavBar from '../ProgressSmallNavBar'

window.Channel = Channel
import pem from 'exports-loader?TaskProxyManager&Platform!pem-platform/task-xd-pr.js'
var task = false
export default {
  methods: {
    ...mapActions(['selectNextStep', 'setCurrentStepResult']),
    ...mapMutations({updateStepState: mutations.UPDATE_STEP_STATE})
  },
  computed: {
    urlLearn () {
      if (this.currentStep) {
        if (this.currentStep.url) {
          return this.currentStep.url + '&token=' + this.authorizations + '&channelId=declick'
        } else {
          // chapter
          this.$router.push({name: 'map', params: {id: this.$route.params.id}})
          return config.clientUrl + 'learn.html#token=' + this.authorizations + '&channelId=declick'
        }
      } else {
        return config.clientUrl + 'learn.html#token=' + this.authorizations + '&channelId=declick'
      }
    },
    ...mapState(['currentStep', 'authorizations'])
  },
  mounted () {
    var self = this
    pem.Platform.prototype.showView = function (views, success, error) {
      if (self.currentStep && self.currentStep.solution) {
        task.reloadAnswer(self.currentStep.solution, () => {
          success()
        })
      } else {
        success()
      }
    }

    pem.Platform.prototype.validate = function (mode, success, error) {
      task.getAnswer(answer => {
        self.updateStepState({passed: true})
        self.setCurrentStepResult({passed: true, solution: answer})
        switch (mode) {
          case 'stay':
            console.log('mode: stay')
            break
          case 'nextImmediate':
            console.log('mode: nextImmediate')
            self.selectNextStep()
            break
        }
        success()
      })
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
  },
  components: {
    ProgressSmallNavBar
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