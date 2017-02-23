<template lang="html">
    <iframe id="declick-client-learn" class="fullscreen-iframe" :src="urlLearn" v-show="this.$route.path == '/progress/circuit/run'"></iframe>
</template>
<script>
import declickConfig from '../../assets/config/declick.js'
import Channel from 'exports-loader?Channel!jschannel/src/jschannel.js'
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
            if (this.$store.state.current_step_url == '') {
                this.$store.dispatch('set_current_step_url',declickConfig.url.client +'learn.html#id=4')                
            }
            return this.$store.state.current_step_url+"&token="+ this.$store.state.authorizations+"&channelId=declick"
        }
    },
    mounted() {
        pem.Platform.prototype.showView = function(views, success, error) {
                console.log("sow view received")
                task.reloadAnswer(JSON.stringify({score : 0,value : "coucou"}), () => {
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