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
  computed: {
        urlLearn () {
        return declickConfig.url.client + 'learn.html#id=4&token=' + this.$store.state.authorizations
        }
    },
    mounted() {
        pem.Platform.prototype.showView = function(views, success, error) {
            window.console.log("received show view");
            success();
            /*
                task.reloadAnswer({score : 0,value : "coucou"}, () => {
                console.log("done.");
            });
            */

        };
        pem.TaskProxyManager.getTaskProxy("declick-client-learn",(ref) => {
            task = ref;
            window.console.log("setting platform");
            pem.TaskProxyManager.setPlatform(task, new pem.Platform());
            window.console.log("platform set");
        });
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