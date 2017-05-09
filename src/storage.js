const dataFolder = "declick-data"
const appDataFolder = "data"
const coursesFolder = "courses"
const assessmentsFolder = "assessments"
const coursesFile = "courses.json"
const assessmentsFile = "assessments.json"
const slidesFolder = "slides"
const resourcesFile = "resources.json"
const courseImageFile = "course.png"
const slideFile = "index.html"

let fs
let app
let path

export default {
  // check that storage space is initialized
  init () {
    let remote = require('electron').remote
    app = remote.app
    fs = remote.require('fs-extra')
    path = remote.require('path')
    this.userFolder = path.format({dir: app.getPath("userData"), base: dataFolder})
    this.appFolder = path.format({dir: app.getAppPath(), base: appDataFolder})
    this.coursesFolder = path.format({dir: this.appFolder, base: coursesFolder})
    this.assessmentsFolder = path.format({dir: this.appFolder, base: assessmentsFolder})
    this.coursesFile = path.format({dir: this.coursesFolder, base: coursesFile})
    this.slidesFolder = path.format({dir: this.appFolder, base: slidesFolder})
    if (!fs.existsSync(this.appFolder)) {
      fs.mkdirSync(this.appFolder)
      fs.mkdirSync(this.coursesFolder)
      fs.mkdirSync(this.assessmentsFolder)
      fs.mkdirSync(this.slidesFolder)
      this.courses = []
      this.saveCourses()
    } else {
      this.courses = JSON.parse(fs.readFileSync(this.coursesFile, {encoding: 'utf8'}))
    }
    if (!fs.existsSync(this.userFolder)) {
      fs.mkdirSync(this.userFolder)
    }
  },
  saveCourses () {
    fs.writeFileSync(this.coursesFile, JSON.stringify(this.courses), {encoding: 'utf8'})
  },
  getCourseFolder (id) {
    return path.format({dir: this.coursesFolder, base: id})
  },
  getAssessmentFolder (id) {
    return path.format({dir: this.assessmentsFolder, base: id})
  },
  getAssessmentsFile (id) {
    return path.format({dir: this.getCourseFolder(id), base: assessmentsFile})
  },
  getResourcesFile (id) {
    return path.format({dir: this.getAssessmentFolder(id), base: resourcesFile})
  },
  getSlideFolder (id) {
    return path.format({dir: this.slidesFolder, base: id})
  },
  addCourse (id) {
    let courseFolder = this.getCourseFolder(id)
    if (fs.existsSync(courseFolder)) {
      fs.removeSync(courseFolder)
    }
    fs.mkdirSync(courseFolder)
  },
  setCourseData (id, data, assessments) {
    fs.writeFileSync(this.getAssessmentsFile(id), JSON.stringify(assessments), {encoding: 'utf8'})
    let courseData = {id: id, name: data.name, summary: data.summary, details: data.details, imageUrl: "../../" + appDataFolder + "/" + coursesFolder + "/" + id + "/" + courseImageFile}
    let index = -1
    for (let i = 0; i < this.courses.length; i++) {
      let data = this.courses[i]
      if (data.id === id) {
        index = i
        break
      }
    }
    if (index > -1) {
      this.courses[index] = courseData
    } else {
      this.courses.push(courseData)
    }
    this.saveCourses()
  },
  setCourseImage (id, data) {
    if (fs.existsSync(this.getCourseFolder(id))) {
      fs.writeFileSync(path.format({dir: this.getCourseFolder(id), base: courseImageFile}), data)
    }
  },
  addAssessment (id, resources) {
    let assessmentFolder = this.getAssessmentFolder(id)
    if (fs.existsSync(assessmentFolder)) {
      fs.removeSync(assessmentFolder)
    }
    fs.mkdirSync(assessmentFolder)
    fs.writeFileSync(this.getResourcesFile(id), JSON.stringify(resources), {encoding: 'utf8'})
  },
  addAssessmentResource (assessmentId, resourceId, content) {
    let resourceFile = path.format({dir: this.getAssessmentFolder(assessmentId), base: resourceId})
    if (fs.existsSync(resourceFile)) {
      fs.removeSync(resourceFile)
    }
    fs.writeFileSync(resourceFile, content)
  },
  addSlide (id, content) {
    let slideFolder = this.getSlideFolder(id)
    if (fs.existsSync(slideFolder)) {
      fs.removeSync(slideFolder)
    }
    fs.mkdirSync(slideFolder)
    fs.writeFileSync(path.format({dir: slideFolder, base: slideFile}), content)
  },
  addSlideImage (id, name, content) {
    let slideFolder = this.getSlideFolder(id)
    fs.writeFileSync(path.format({dir: slideFolder, base: name}), content)
  },
  /* API CALLS */
  getAllCourses () {
    return this.courses
  },
  getAllCourseAssessments (id) {
    return JSON.parse(fs.readFileSync(this.getAssessmentsFile(id), {encoding: 'utf8'}))
  }
  /* ,
  addAssessmentResources (id, ) */
}
