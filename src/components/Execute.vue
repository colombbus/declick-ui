<template lang="pug">
div.main__execute
  iframe(v-if='project', id="execution-frame", :src="iframeUrl", frameborder="0", scrolling="no", onmousewheel="", :style="iframeStyle")
</template>

<script>
import {mapState} from 'vuex'
import config from 'assets/config/declick'

let viewPortTag

export default {
  computed: {
    iframeStyle () {
      let content = "width:"
      if (this.project && this.project.sceneWidth) {
        content += this.project.sceneWidth + "px;"
      } else {
        content += "100%;"
      }
      content += "height:"
      if (this.project && this.project.sceneHeight) {
        content += this.project.sceneHeight + "px;"
      } else {
        content += "100%;"
      }
      return content
    },
    iframeUrl () {
      if (this.project && this.project.mainProgram) {
        return config.clientUrl + 'execute.html#id=' + this.project.id + '&init=' + encodeURI(this.project.mainProgram)
      } else {
        return ""
      }
    },
    ...mapState({project: 'executeProject'})
  },
  mounted () {
    viewPortTag = document.createElement('meta')
    viewPortTag.id = "viewport"
    viewPortTag.name = "viewport"
    viewPortTag.content = "width=device-width, user-scalable=no"
    document.getElementsByTagName('head')[0].appendChild(viewPortTag)
  },
  watch: {
    project () {
      if (this.project.sceneWidth) {
        viewPortTag.content = "width=" + this.project.sceneWidth + ", user-scalable=no"
      } else {
        viewPortTag.content = "width=device-width, user-scalable=no"
      }
    }
  }
}
</script>

<style lang="css">
.main__execute {
  height:100vh;
  background-color:#000000;
}
#execution-frame {
  display:block;
  margin-left:auto;
  margin-right:auto;
  padding:0;
}
</style>
