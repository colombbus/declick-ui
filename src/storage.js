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
const userFile = "user.json"
const resultsFolder = "results"
const projectsFolder = "projects"
const resultsFile = "results.json"
const projectFile = "project.json"

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
    this.usersFolder = path.format({dir: app.getPath("userData"), base: dataFolder})
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
    if (!fs.existsSync(this.usersFolder)) {
      fs.mkdirSync(this.usersFolder)
      this.createUser(0)
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
  getUserFolder (id) {
    return path.format({dir: this.usersFolder, base: id.toString()})
  },
  getUserResultsFolder (userId) {
    return path.format({dir: this.getUserFolder(userId), base: resultsFolder})
  },
  getUserResultsFile (userId) {
    return path.format({dir: this.getUserResultsFolder(userId), base: resultsFile})
  },
  getProjectsFolder (userId) {
    return path.format({dir: this.getUserFolder(userId), base: projectsFolder})
  },
  getProjectFolder (userId, projectId) {
    return path.format({dir: this.getProjectsFolder(userId), base: projectId.toString()})
  },
  getProjectFile (userId, projectId) {
    return path.format({dir: this.getProjectFolder(userId, projectId), base: projectFile})
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
  createUser (id) {
    fs.mkdirSync(this.getUserFolder(id))
    fs.mkdirSync(path.format({dir: this.getUserFolder(id), base: resultsFolder}))
    fs.mkdirSync(path.format({dir: this.getUserFolder(id), base: projectsFolder}))
    this.userId = id
    this.userInfo = {
      id: id,
      username: 'default',
      email: 'default',
      defaultProjectId: 0,
      currentProjectId: 0,
      isAdmin: false,
      nextProjectId: 0
    }
    this.saveUserInfo()
    this.userResults = []
    this.saveUserResults()
    let defaultProject = {
      id: 0,
      name: 'Mon projet',
      isPublic: false,
      isDefault: true,
      sceneWidth: '',
      sceneHeight: '',
      description: '',
      instructions: ''
    }
    this.createProject(defaultProject)
  },
  getUserInfo (id) {
    return JSON.parse(fs.readFileSync(path.format({dir: this.getUserFolder(id), base: userFile}), {encoding: 'utf8'}))
  },
  loadUser (id) {
    this.userId = id
    this.userInfo = this.getUserInfo(id)
    this.loadUserResults()
  },
  saveUserInfo (id, info) {
    if (typeof id === 'undefined') {
      id = this.userId
      info = this.userInfo
    }
    fs.writeFileSync(path.format({dir: this.getUserFolder(id), base: userFile}), JSON.stringify(info), {encoding: 'utf8'})
  },
  loadUserResults () {
    let resultsFile = this.getUserResultsFile(this.userId)
    if (!fs.existsSync(resultsFile)) {
      this.userResults = []
    } else {
      this.userResults = JSON.parse(fs.readFileSync(resultsFile, {encoding: 'utf8'}))
    }
  },
  saveUserResults () {
    let resultsFile = this.getUserResultsFile(this.userId)
    if (fs.existsSync(resultsFile)) {
      fs.removeSync(resultsFile)
    }
    let folder = this.getUserResultsFolder(this.userId)
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }
    fs.writeFileSync(resultsFile, JSON.stringify(this.userResults), {encoding: 'utf8'})
  },
  /* API CALLS */
  getAllCourses () {
    return this.courses
  },
  getAllCourseAssessments (id) {
    return JSON.parse(fs.readFileSync(this.getAssessmentsFile(id), {encoding: 'utf8'}))
  },
  getUserByToken (token) {
    this.loadUser(token)
    return this.userInfo
  },
  createToken (username, password) {
    return 0
  },
  registerUserResult (
    userId,
    assessmentId,
    data,
    token
  ) {
    let found = false
    for (let i = 0; i < this.userResults.length; i++) {
      if (this.userResults[i].assessmentId === assessmentId) {
        found = true
        let old = this.userResults[i]
        if (old.passed) {
          if (data.passed) {
            old.solution = data.solution
          }
        } else {
          if (data.passed) {
            old.passed = true
          }
          old.solution = data.solution
        }
        break
      }
    }
    if (!found) {
      this.userResults.push({userId: this.userId, assessmentId: assessmentId, passed: data.passed, solution: data.solution})
    }
    this.saveUserResults()
  },
  getAllUserResults (id, token) {
    return this.userResults
  },
  getProjectData (project) {
    project.name = (project.name === '' && project.is_default)
        ? 'Mon projet'
        : project.name
    return project
  },
  getProject (id, token) {
    window.console.log("Get project, id=" + id)
    let projectFile = this.getProjectFile(this.userId, id)
    if (fs.existsSync(projectFile)) {
      let project = JSON.parse(fs.readFileSync(projectFile, {encoding: 'utf8'}))
      return this.getProjectData(project)
    } else {
      return false
    }
  },
  createProject (data, token) {
    let projectId = this.userInfo.nextProjectId
    let project = data
    project.id = projectId
    let projectFolder = this.getProjectFolder(this.userId, projectId)
    fs.mkdirSync(projectFolder)
    fs.writeFileSync(this.getProjectFile(this.userId, projectId), JSON.stringify(project), {encoding: 'utf8'})
    this.userInfo.nextProjectId++
    this.saveUserInfo()
    fs.writeFileSync(path.format({dir: projectFolder, base: resourcesFile}), JSON.stringify([]), {encoding: 'utf8'})
    return this.getProjectData(project)
  },
  updateProject (id, data, token) {
    let projectFile = this.getProjectFile(this.userId, id)
    if (fs.existsSync(projectFile)) {
      let project = data
      project.id = id
      fs.removeSync(projectFile)
      fs.writeFileSync(projectFile, JSON.stringify(project), {encoding: 'utf8'})
      return this.getProjectData(project)
    } else {
      return false
    }
  },
  getAllUserProjects (id, token) {
    let results = []
    let projectsFolder = this.getProjectsFolder(this.userId)
    let folders = fs.readdirSync(projectsFolder)
    for (let i = 0; i < folders.length; i++) {
      let folder = folders[i]
      if (fs.lstatSync(path.join(projectsFolder, folder)).isDirectory()) {
        let projectId = parseInt(folder)
        if (!isNaN(projectId)) {
          let project = this.getProject(projectId)
          results.push(this.getProjectData(project))
        }
      }
    }
    return results
  },
  deleteProject (id, token) {
    let projectFolder = this.getProjectFolder(this.userId, id)
    if (fs.existsSync(projectFolder)) {
      fs.removeSync(projectFolder)
    }
  },
  updateUser (id, data, token) {
    let userInfo = this.getUserInfo(id)
    if (data.email !== undefined) {
      userInfo.email = data.email
    }
    if (data.isAdmin !== undefined) {
      userInfo.isAdmin = data.isAdmin
    }
    if (data.currentProjectId !== undefined) {
      userInfo.currentProjectId = data.currentProjectId
    }
    if (data.defaultProjectId !== undefined) {
      userInfo.defaultProjectId = data.defaultProjectId
    }
    this.saveUserInfo(id, userInfo)
    return userInfo
  }
}
