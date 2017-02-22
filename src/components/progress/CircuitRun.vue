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
            initialized:false
        }
    },
    computed: {
        urlLearn () {
            if (!this.initialized) {
                return declickConfig.url.client +'learn.html#id=4&token=' + this.$store.state.authorizations+"&?channelId=declick";
            } else {
                return declickConfig.url.client + 'learn.html#id=4&token=' + this.$store.state.authorizations+"&?channelId=declick";
            }
        }
    },
    mounted() {
        pem.Platform.prototype.showView = function(views, success, error) {
                task.reloadAnswer(JSON.stringify({score : 0,value : "coucou"}), () => {
                success();
            });
    
        };
        pem.TaskProxyManager.getTaskProxy("declick-client-learn",(ref) => {
            task = ref;
            pem.TaskProxyManager.setPlatform(task, new pem.Platform(task));
            this.initialized = true;
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