<template lang="html">
    <iframe id="declick-client-learn" class="fullscreen-iframe" :src="urlLearn" v-show="this.$route.name == 'step'"></iframe>
</template>
<script>
import declickConfig from '../../assets/config/declick.js'
import Channel from 'exports-loader?Channel!jschannel/src/jschannel.js'
import { mapState } from 'vuex'

window.Channel = Channel;
import pem from 'exports-loader?TaskProxyManager&Platform!pem-platform/task-xd-pr.js'
var task = false;
export default {
    data () {
        return {
        }
    },
    computed: {
        urlLearn () {
            if (this.current_step_url == '') {
                this.$store.dispatch('set_current_step_url',declickConfig.url.client +'learn.html#id=4')                
            }
            return this.current_step_url+"&token="+ this.authorizations+"&channelId=declick"
        },
        ...mapState(['current_step_url', 'current_step_index', 'authorizations'])
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
                        self.$store.dispatch('set_current_step_index',this.current_step_index + 1)
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