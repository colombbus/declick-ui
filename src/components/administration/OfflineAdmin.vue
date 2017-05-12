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

var IMAGE_MEDIA_TYPES = {
  'gif': 'image/gif',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'png': 'image/png'
}

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
      Storage.addCourse(this.courseId)
      this.log += " Ok\n"
      this.log += "Récupération des étapes du parcours..."
      let steps = await Api.getAllCourseAssessments(this.courseId)
      this.log += " Ok\n"
      this.log += "Récupération de l'illustration du parcours..."
      let {body} = await Vue.http.get(info.imageUrl, {responseType: 'blob'})
      let self = this
      blobReader.onload = function () {
        let imageData = new Uint8Array(this.result)
        Storage.setCourseImage(self.courseId, imageData)
        self.log += " Ok\n"
      }
      blobReader.readAsArrayBuffer(body)
      for (let i = 0; i < steps.length; i++) {
        let step = steps[i]
        this.log += "Import des ressources de l'étape " + step.id + " (" + step.name + ")..."
        let checkLearn = /.*learn.html(#.*)/
        let checkStep = /#id=(.*)/
        let checkSlide = /#slide=(.*)/
        let checkImgs = /(<img\s[^>]*?src\s*=\s*['"])([^'"]*?)(['"][^>]*?>)/g
        if (step.url) {
          let result = step.url.match(checkLearn)
          if (result) {
            // Url with learn.html
            step.url = result[1]
            result = step.url.match(checkStep)
            if (result) {
              // Change id into negative ones to distinguish from user projects
              step.url = step.url.replace(/(\d+)/, "-$1")
              let id = result[1]
              this.log += (" - step - ")
              let resources = await Api.getAssessmentResources(id)
              Storage.addAssessment(id, resources)
              for (let j = 0; j < resources.length; j++) {
                let resourceId = resources[j].id
                let extension = ""
                for (var ext in IMAGE_MEDIA_TYPES) {
                  if (resources[j].media_type === IMAGE_MEDIA_TYPES[ext]) {
                    extension = '.' + ext
                    break
                  }
                }
                let content = await Api.getAssessmentResourceContent(id, resourceId)
                blobReader.onload = function () {
                  Storage.addAssessmentResource(id, resourceId + extension, new Uint8Array(this.result))
                }
                blobReader.readAsArrayBuffer(content)
              }
            } else {
              result = step.url.match(checkSlide)
              if (result) {
                let id = result[1]
                this.log += (" - slide - ")
                let slideUrl = config.cmsUrl + "api/1/tables/slides/rows/" + id + "?access_token=jWNoVhWCng6odNLK"
                let {body} = await Vue.http.get(slideUrl, {responseType: 'text'})
                let content = body.content
                // lookup images in body
                let imgs = []
                content = content.replace(checkImgs, (match, start, value, end) => {
                  let extension = value.match(/.([^.]*)$/)
                  let newName = "" + imgs.length
                  if (extension.length > 0) {
                    newName += "." + extension[1]
                  }
                  imgs.push({url: value, name: newName})
                  return start + "../../data/slides/" + id + "/" + newName + end
                })
                Storage.addSlide(id, content)
                for (let i = 0; i < imgs.length; i++) {
                  let {body} = await Vue.http.get(imgs[i].url, {responseType: 'blob'})
                  blobReader.onload = function () {
                    Storage.addSlideImage(id, imgs[i].name, new Uint8Array(this.result))
                  }
                  blobReader.readAsArrayBuffer(body)
                }
              }
            }
          }
        } else {
          this.log += (" - chapter - ")
        }
        this.log += " Ok\n"
      }
      this.log += "Sauvegarde du parcours..."
      Storage.setCourseData(this.courseId, info, steps)
      this.log += " Ok\n"
    }
  }
}
</script>
<style lang="sass" scoped>
.log
  white-space: pre

</style>