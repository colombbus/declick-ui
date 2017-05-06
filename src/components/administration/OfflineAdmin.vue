<template lang="pug">
.content
  | Import d'un parcours
  .entry
    label(for="id") Identifiant
    input(type="text" v-model="courseId" name="id")
  button(@click="importCourse") Importer
  .log
    | {{log}}
</template>

<script>
import Vue from "vue"
import Api from "../../api"
import Storage from "../../storage"
import config from "assets/config/declick"

export default {
  data () {
    return {
      courseId: '',
      log: ''
    }
  },
  methods: {
    async importCourse () {
      let blobReader = new FileReader()
      // get steps
      this.log += "Récupération des infos du parcours..."
      let info = await Api.getCourse(this.courseId)
      this.log += " Ok\n"
      this.log += "Récupération des étapes du parcours..."
      let steps = await Api.getAllCourseAssessments(this.courseId)
      this.log += " Ok\n"
      this.log += "Sauvegarde du parcours..."
      Storage.addCourse(this.courseId, info, steps)
      this.log += " Ok\n"
      this.log += "Récupération de l'illustration du parcours..."
      let response = await Vue.http.get(info.imageUrl, {responseType: 'blob'})
      let self = this
      blobReader.onload = function () {
        let imageData = new Uint8Array(this.result)
        Storage.setCourseImage(self.courseId, imageData)
        self.log += " Ok\n"
      }
      blobReader.readAsArrayBuffer(await response.blob())
      for (let i = 0; i < steps.length; i++) {
        let step = steps[i]
        this.log += "Import des ressources de l'étape " + step.id + " (" + step.name + ")..."
        let checkStep = /#id=(.*)/
        let checkSlide = /#slide=(.*)/
        if (step.url) {
          let result = step.url.match(checkStep)
          if (result) {
            let id = result[1]
            this.log += (" - step - ")
            let resources = await Api.getAssessmentResources(id)
            Storage.addAssessment(id, resources)
            for (let j = 0; j < resources.length; j++) {
              let resourceId = resources[j].id
              let content = await Api.getAssessmentResourceContent(id, resourceId)
              blobReader.onload = function () {
                Storage.addAssessmentResource(id, resourceId, new Uint8Array(this.result))
              }
              blobReader.readAsArrayBuffer(content)
            }
          } else {
            result = step.url.match(checkSlide)
            if (result) {
              let id = result[1]
              this.log += (" - slide - ")
              let slideUrl = config.cmsUrl + "api/1/tables/slides/rows/" + id + "?access_token=jWNoVhWCng6odNLK"
              let {body} = await Vue.http.get(slideUrl, {responseType: 'blob'})
              Storage.addSlide(id, body.content)
              // TODO check if images are inside content and need to be downloaded as well
            }
          }
        } else {
          this.log += (" - chapter - ")
        }
        this.log += " Ok\n"
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.log
  white-space: pre

</style>