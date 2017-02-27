<template lang="html">
    <iframe id="declick-client-learn" class="fullscreen-iframe" :src="urlLearn" v-show="this.$route.name == 'step'"></iframe>
</template>
<script>
import declickConfig from '../../assets/config/declick.js'
import Channel from 'exports-loader?Channel!jschannel/src/jschannel.js'
import { mapState, mapActions } from 'vuex'

window.Channel = Channel;
import pem from 'exports-loader?TaskProxyManager&Platform!pem-platform/task-xd-pr.js'
var task = false;
export default {
    data () {
        return {
        }
    },
    methods: {
    ...mapActions(['selectNextStep'])
    },
    computed: {
        urlLearn () {
            if (this.currentStep) {
                return this.currentStep.url+"&token="+ this.authorizations+"&channelId=declick"
            } else {
                return declickConfig.url.client +'learn.html#token='+ this.authorizations+"&channelId=declick"
            }

        },
        ...mapState(['currentStep', 'authorizations'])
    },
    mounted() {
        pem.Platform.prototype.showView = function(views, success, error) {
                console.log("show view received")
                task.reloadAnswer(JSON.stringify({score : 0,value : "coucou"}), () => {
                success()
            })
        }
        var self = this
        pem.Platform.prototype.validate = function(mode, success, error) {
            console.log("validate received")
            task.getAnswer((answer)=> {
                console.log("answer received")
                console.debug(answer)
                // TODO: store answer
                // TODO: set map accordingly
                switch (mode) {
                    case "stay": 
                        console.log("mode: stay")
                        break
                    case "nextImmediate":
                        console.log("mode: nextImmediate")
                        this.selectNextStep()
                        break
                }
                success()

            })
        }

        pem.TaskProxyManager.getTaskProxy("declick-client-learn",(ref) => {
            task = ref
            pem.TaskProxyManager.setPlatform(task, new pem.Platform(task))
        })
    }
}


</script>
<style lang="css">
.fullscreen-iframe {
  height: calc(100vh - 60px);
  width: 100%;
  border: none;
  overflow:hidden;
}
</style>