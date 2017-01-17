import paper from'paper/dist/paper-full.min.js'
import './jquery.mousewheel.min.js'



export default {

      /*
       * VARIABLES
       */
       times: 0,
      // main path
       path:'',
       $canvas:{},

       everything:{},

      // chapters
       chapters:[],
       sChapter:[],
       sChapterValidated:[],
       currentChapterLabels:[],
       chapterPaths:[],
       chapterLabels:[],
       chapterOpen:false,

      // steps
       steps:[],
       sStep:[],
       sStepValidated:[],
       sStepVisited:[],
       displayedSteps:[],
       stepCallback:'',
       stepsDisplayed:false,

      // current step
       current:0,
       currentIndex:-1,
       currentCallback:false,

      // labels
       labels:[],
       labelsVisible:false,

      // position and zoom
       initCenter:0,
       targetZoom:0,
       targetCenter:0,
       targetCurrent:0,
       changeZoom:false,
       changeCenter:false,
       changeCurrent:false,
       movementSpeed:0,
       zoomSpeed:0,
       currentSpeed:0,

       clickCaptured:false,

      /*
       * CONSTANTS
       */

      // margin around the path
       margin:40,

      // duration of animations
       animationDuration:0.8,

      // zoom factor
       zoomFactor:200,

      // zoom threshold to display labels
       zoomDisplayLabels:1.5,
      // max and min levels of zoom
       maxZoom:3.5,



       reset:function() {
           // intialize zoom and center position
           this.initCenter = new paper.Point(paper.view.center);
           this.targetCenter = new paper.Point(this.initCenter);
           this.targetZoom = 1;
       },

       initView:function(canvasId) {

           // Get a reference to the canvas object
           var canvas = document.getElementById(canvasId);
           this.$canvas = $(canvas);
           this.$canvas.attr("resize", "1");
           this.$canvas.css("cursor", "pointer");

           // setup paperjs
           paper.setup(canvas);

           //this.reset();
           var _this = this
           // view resizing
           paper.view.onResize = function(event) {
               _this.reset();
               if (_this.stepsDisplayed) {
                       _this.resize();
               }
           };

           // zooming with scroll
           var scrollTimeout = -1;
           var endScrollTimeout = -1;
           var scrollAmount = 0;
           var scrollPoint = false;

           var handleScroll = function() {
               var newZoom = _this.targetZoom+scrollAmount/_this.zoomFactor;
               newZoom = Math.min(newZoom, _this.maxZoom);
               if (newZoom < 1) {
                   _this.setTarget(_this.initCenter, 1, true);
               } else {
                   var newCenter = scrollPoint.add(_this.targetCenter.subtract(scrollPoint).divide(newZoom/_this.targetZoom));
                   _this.setTarget(newCenter, newZoom, true);
               }
               scrollAmount = 0;
           }

           this.$canvas.mousewheel(function(event) {
               event.preventDefault();
               if (scrollPoint === false) {
                   // first call: register scroll point
                   scrollPoint = paper.view.getEventPoint(event);
               }
               if (endScrollTimeout !== -1) {
                   clearTimeout(endScrollTimeout);
               }
               scrollAmount = event.deltaY*event.deltaFactor;
               if (scrollTimeout === -1 && !(_this.targetZoom < 1 && scrollAmount <0) && !(_this.targetZoom == _this.maxZoom && scrollAmount>0)) {
                   handleScroll();
                   scrollTimeout = setTimeout(function() {
                       handleScroll();
                       scrollTimeout = -1;
                   }, 200);
               }
               endScrollTimeout = setTimeout(function() {
                   if (_this.targetZoom <1) {
                       _this.setTarget(_this.initCenter, 1, true);
                       endScrollTimeout = -1;
                   }
                   scrollPoint = false;
               }, 250);
           });

           // handling of space key
           var tool = new paper.Tool();
           tool.onKeyDown = function(event) {
               if (event.key === 'space') {
                   _this.setTarget(_this.initCenter, 1);
               }
           };


           // mouse dragging management
           var dragStartPoint;

           paper.view.onMouseDown = function(e){
               dragStartPoint = e.point;
           };

           paper.view.onMouseDrag = function(e){
               var delta = e.point.subtract(dragStartPoint);
               paper.view.center = paper.view.center.subtract(delta);
               _this.targetCenter = paper.view.center;
           };

           // Map animation
           paper.view.onFrame = function(event) {
               var vector, step;
               var view = paper.view;
               var center = view.center;
               if (_this.changeCenter) {
                   step = event.delta*_this.movementSpeed;
                   vector = _this.targetCenter.subtract(center);
                   if (vector.length > step) {
                       step = vector.normalize(step);
                       view.center = center.add(step);
                   } else {
                       view.center = new paper.Point(_this.targetCenter);
                       _this.changeCenter = false;
                   }
               }
               if (_this.changeZoom) {
                   step = event.delta*_this.zoomSpeed;
                   if (view.zoom < _this.targetZoom) {
                       view.zoom = Math.min(view.zoom + step, _this.targetZoom);
                   } else {
                       view.zoom = Math.max(view.zoom - step, _this.targetZoom);
                   }
                   if (view.zoom === _this.targetZoom) {
                       _this.changeZoom = false;
                   }
                   _this.checkLabelsVisibility();
               }
               if (_this.changeCurrent) {
                   step = event.delta*_this.currentSpeed;
                   vector = _this.targetCurrent.subtract(_this.current.position);
                   if (vector.length > step) {
                       step = vector.normalize(step);
                       _this.current.position = _this.current.position.add(step);
                   } else {
                       _this.current.position = _this.targetCurrent;
                       _this.changeCurrent = false;
                       if (_this.currentCallback) {
                           _this.currentCallback();
                       }
                   }
               }
           };
       },



           // Define symbols used for chapters and steps
           initSymbols:function(currentSVG, callback) {
               // chapter
               var pChapter = new paper.Path.Circle(new paper.Point(0, 0), 12);
               pChapter.strokeColor = "#E01980";
               pChapter.strokeWidth = 2;
               pChapter.fillColor = "#46102A";
               this.sChapter = new paper.Symbol(pChapter);
               // step
               var pStep = new paper.Path.Circle(new paper.Point(0, 0), 8);
               pStep.strokeColor = "#E33022";
               pStep.strokeWidth = 1;
               pStep.fillColor = "#46102A";
               this.sStep = new paper.Symbol(pStep);
               // validated step
               var pStepValidated = new paper.Group();
               var pStepValidatedOuter = new paper.Path.Circle(new paper.Point(0, 0), 8);
               pStepValidatedOuter.strokeColor = "#E33022";
               pStepValidatedOuter.strokeWidth = 1;
               pStepValidatedOuter.fillColor = "#46102A";
               var pStepValidatedInner = new paper.Path.Circle(new paper.Point(0, 0), 6);
               pStepValidatedInner.fillColor = "#0FAC8D";
               pStepValidated.addChild(pStepValidatedOuter);
               pStepValidated.addChild(pStepValidatedInner);
               this.sStepValidated = new paper.Symbol(pStepValidated);
               var pChapterValidated = new paper.Group();
               var pChapterValidatedOuter = new paper.Path.Circle(new paper.Point(0, 0), 12);
               pChapterValidatedOuter.strokeColor = "#E01980";
               pChapterValidatedOuter.strokeWidth = 2;
               pChapterValidatedOuter.fillColor = "#46102A";
               var pChapterValidatedInner = new paper.Path.Circle(new paper.Point(0, 0), 10);
               pChapterValidatedInner.fillColor = "#0FAC8D";
               pChapterValidated.addChild(pChapterValidatedOuter);
               pChapterValidated.addChild(pChapterValidatedInner);
               this.sChapterValidated = new paper.Symbol(pChapterValidated);
               // visited step
               var pStepVisited = new paper.Path.Circle(new paper.Point(0, 0), 6);
               pStepVisited.fillColor = "#E33022";
               this.sStepVisited = new paper.Symbol(pStepVisited);
               // load current image in a upper layer
               var activeLayer = paper.project.activeLayer;
               var currentLayer = new paper.Layer();
               // current step
               var _this = this

               paper.project.importSVG(currentSVG, function(item) {

                   _this.current = item;
                   _this.current.visible = true;

                   activeLayer.activate();
                   if (callback) {
                       callback();
                   }
               });

           },

           checkLabelsVisibility:function() {
               // check if texts have to be displayed or hidden
               if (this.labelsVisible) {
                   if (paper.view.zoom < this.zoomDisplayLabels) {
                       for (var i = 0; i<this.chapterLabels.length; i++) {
                           this.chapterLabels[i].visible = false;
                       }
                       this.labelsVisible = false;
                   }
               } else {
                   if (paper.view.zoom >this.zoomDisplayLabels) {
                       for (var i = 0; i<this.chapterLabels.length; i++) {
                           this.chapterLabels[i].visible = true;
                       }
                       this.labelsVisible = true;
                   }
               }
           },

           centerEverything:function() {
               this.everything.position = new paper.Point(paper.view.center);
           },


           initSteps:function(data) {
               this.steps = [];
               var _this = this;
               function getObject(value, chapter) {
                   var object = {chapter: chapter, name: value.name};
                   if (typeof value.id !== 'undefined') {
                       object.id = value.id;
                   }
                   if (value.passed) {
                       object.passed = value.passed;
                   }
                   if (value.visited) {
                       object.visited = value.visited;
                   }
                   return object;
               }
               $.each(data, function(key, value) {
                   _this.steps.push(getObject(value, true));
                   if (value.steps) {
                       $.each(value.steps, function(key, value) {
                           _this.steps.push(getObject(value, false));
                       });
                   }
               });
           },

           openChapter:function(index, animate) {
               if (typeof animate === 'undefined') {
                   animate = false;
               }
               if (index < this.chapterPaths.length) {
                   var currentChapterPath = this.chapterPaths[index];
                   var bounds = currentChapterPath.bounds;
                   bounds = bounds.expand(2*this.margin);
                   var zHeight = paper.view.bounds.height / (bounds.height);
                   var zWidth = paper.view.bounds.width / (bounds.width);
                   if (animate) {
                       this.setTarget(bounds.center, paper.view.zoom * Math.min(zHeight, zWidth));
                   } else {
                       paper.view.center = new paper.Point(bounds.center);
                       this.targetCenter = new paper.Point(paper.view.center);
                       paper.view.zoom = paper.view.zoom * Math.min(zHeight, zWidth);
                       this.targetZoom = paper.view.zoom;
                       this.checkLabelsVisibility();
                   }
                   this.chapterOpen = true;
               } else {
                   this.chapterOpen = false;
               }
           },

           setTargetZoom:function(zoom, fast) {
               this.targetZoom = zoom;
               this.changeZoom = true;
               this.zoomSpeed = Math.abs(zoom - paper.view.zoom)/this.animationDuration;
               if (fast) {
                   this.zoomSpeed = this.zoomSpeed*2;
               }
           },

           setTargetCenter:function(center, fast) {
               this.targetCenter = new paper.Point(center);
               this.changeCenter = true;
               this.movementSpeed = (paper.view.center.getDistance(this.targetCenter))/this.animationDuration;
               if (fast) {
                   this.movementSpeed = this.movementSpeed*2;
               }
           },

           setTargetCurrent:function(position, factor) {
               this.targetCurrent = new paper.Point(position);
               this.changeCurrent = true;

               this.currentSpeed = (this.current.position.getDistance(this.targetCurrent)*factor)/(this.animationDuration);
           },

           setTarget:function(center, zoom, fast) {
               this.setTargetZoom(zoom, fast);
               this.setTargetCenter(center, fast);
           },

           wordwrap:function(txt,max) {
               var lines=[];
               var space=-1;
               this.times=0;
               var _this = this
               function cut() {
                   for(var i=0;i<txt.length;i++) {
                       if (txt[i]==' ') {
                           space=i;
                       }
                       if(i>=max) {
                           if (space==-1||txt[i]==' ') {
                               space = i;
                           }
                           if(space>0) {
                               lines.push(txt.slice((txt[0]===' '?1:0),space));
                           }
                           txt = txt.slice(txt[0]===' '?(space+1):space);
                           space=-1;
                           break;
                       }
                   }
                   check();
               }

               function check() {
                   if(txt.length<=max) {
                       lines.push(txt[0]===' '?txt.slice(1):txt);txt='';
                   } else if (txt.length) {
                       cut();
                   }
                   return;
               }
               check();
               return lines.join('\n');
           },

           getSymbol:function(step) {
               if (step.chapter) {
                   if (step.passed) {
                       return this.sChapterValidated;
                   } else {
                       return this.sChapter;
                   }
               } else {
                   if (step.passed) {
                       return this.sStepValidated;
                   } else if (step.visited) {
                       return this.sStepVisited;
                   } else {
                       return this.sStep;
                   }
               }
           },

           removeSteps:function() {
               // remove everything
               paper.project.activeLayer.removeChildren();
               // initialize data
               this.displayedSteps = [];
               this.chapterPaths = [];
               this.chapterLabels = [];
               this.chapters = [];
               this.labels = [];
               this.currentIndex = -1;
               this.chapterOpen = false;
               this.changeCenter = false;
               this.changeZoom = false;
               this.changeCurrent = false;
               this.labelsVisible = false;
               this.stepsDisplayed = true;

               if (this.initCenter) {
                   paper.view.center = new paper.Point(this.initCenter);
                   this.targetCenter = new paper.Point(this.initCenter);
               }
               paper.view.zoom = 1;
               this.targetZoom = 1;
               // create new group
               this.everything = new paper.Group();
               // fit path to new dimensions
               if (this.path) {
                   this.path.fitBounds(paper.view.bounds.expand(-this.margin));
                   // add path to new group
                  this.everything.addChild(this.path);
                   // center everything
                   this.centerEverything();
               }
           },

           resize:function() {

               var savedCurrentIndex = this.currentIndex;
               var savedChapterOpen = this.chapterOpen;
               this.removeSteps();
               // display steps
               this.displaySteps();
               // open chapter if required
               if (savedCurrentIndex>-1 && savedChapterOpen) {
                   this.setCurrentStep5(this.steps[savedCurrentIndex].id, false);
               }
           },


           // Position steps on the path
           displaySteps:function() {

               var previousChapter = false;
               var previousLabel;
               var currentLabels;
               if (!this.path) {
                   return;
               }
               var basePath = this.path.clone();
               var _this = this
               var placeSymbol = function(index, curve, length, last) {
                   var chapter = _this.steps[index].chapter;
                   var symbol = _this.getSymbol(_this.steps[index]);
                   var point = curve.getPointAt(length, false);
                   var placed = symbol.place(point);
                   var hasSubItems = false;
                   var offset, newPath, chapterPath;
                   _this.displayedSteps.push(placed);
                   _this.everything.addChild(placed);

                   if (chapter) {
                       if (_this.previousChapter) {
                           offset = basePath.getOffsetOf(placed.position);
                           newPath = basePath.split(offset);
                           chapterPath = basePath;
                           chapterPath.visible = false;
                           _this.chapterPaths.push(chapterPath);
                           basePath = newPath;
                           _this.everything.addChild(currentLabels);
                           _this.chapterLabels.push(currentLabels);
                       }
                       _this.previousChapter = true;
                       _this.chapters.push(placed);
                       currentLabels = new paper.Group();
                       currentLabels.visible = false;
                       if (typeof _this.steps[index+1] !== 'undefined' && !_this.steps[index+1].chapter) {
                               hasSubItems = true;
                       }
                       if (hasSubItems) {
                           placed.onMouseDown = _this.getChapterMouseHandler(_this.chapters.length - 1);
                       } else {
                           // no subitems: open corresponding step
                           placed.onMouseDown = _this.getStepMouseHandler(index);
                       }
                       // display chapter number
                       var textNumber = new paper.PointText({
                           point: point,
                           justification: 'center',
                           fontSize: 15,
                           fillColor: "#FFFFFF",
                           content: _this.chapters.length
                       });
                       textNumber.bounds.center = point;
                       if (hasSubItems) {
                           placed.onMouseDown = _this.getChapterMouseHandler(_this.chapters.length - 1);
                           textNumber.onMouseDown = _this.getChapterMouseHandler(_this.chapters.length - 1);
                       } else {
                           // no subitems: open corresponding step
                           placed.onMouseDown = _this.getStepMouseHandler(index);
                           textNumber.onMouseDown = _this.getStepMouseHandler(index);
                       }
                       _this.everything.addChild(textNumber);
                   } else {
                       placed.onMouseDown = _this.getStepMouseHandler(index);
                       if (last) {
                           offset = basePath.getOffsetOf(placed.position);
                           newPath = basePath.split(offset);

                           chapterPath = basePath;
                           chapterPath.visible = false;
                           _this.chapterPaths.push(chapterPath);
                           basePath = newPath;
                           _this.everything.addChild(currentLabels);
                           _this.chapterLabels.push(currentLabels);
                       }
                   }
                   // Label
                   var textColor, textSize, textShift;
                   if (chapter) {
                       textColor = "#E01980";
                       textSize = 15;
                       textShift = 20;
                   } else {
                       textColor = "#FFFFFF";
                       textSize = 8;
                       textShift = 15;
                   }
                   var normal = curve.getNormalAt(length, false);
                   normal.length = textShift;
                   var text = new paper.PointText({
                       point: point.add(normal/*new paper.Point(textShift, textSize/3)*/),
                       justification: 'left',
                       fontSize: textSize,
                       fillColor: textColor,
                       content: _this.steps[i].name
                   });
                   if (!chapter) {
                       if (previousLabel && previousLabel.bounds.intersects(text.bounds)) {
                           normal = normal.multiply(-2);
                           text.point = text.point.add(normal);
                       }

                       previousLabel = text;
                       _this.everything.addChild(text);
                       text.onMouseDown = _this.getStepMouseHandler(index);
                   } else {
                       text.content = _this.wordwrap(_this.steps[i].name, 12);
                       if (text.intersects(_this.path)) {
                           normal = normal.multiply(-2);
                           text.point = text.point.add(normal);
                       }
                       _this.everything.addChild(text);
                       if (hasSubItems) {
                           text.onMouseDown = _this.getChapterMouseHandler(_this.chapters.length - 1);
                       } else {
                           text.onMouseDown = _this.getStepMouseHandler(index);
                       }
                       previousLabel = null;
                   }
                   _this.labels.push(text);
                   return placed;
               };

               var stepLength = _this.path.length / (_this.steps.length - 1);
               var curves = _this.path.curves;
               var currIndex = 0;
               var currentCurve = curves[0];
               var currentLength = 0;
               for (var i = 0; i < _this.steps.length - 1; i++) {
                   while (currentLength > currentCurve.length) {
                       currentLength -= currentCurve.length;
                       currIndex++;
                       currentCurve = curves[currIndex];
                   }
                   placeSymbol(i, currentCurve, currentLength);
                   currentLength += stepLength;
               }

               currentCurve = curves[curves.length - 1];
               // place last step
               placeSymbol(i, currentCurve, currentCurve.length, true);

               // resize and place current image
               var startIndex;
               if (_this.currentIndex === -1) {
                   //currentIndex not set yet
                   startIndex = 0;
                   _this.current.visible = false;
               } else {
                   startIndex = _this.currentIndex;
               }

               _this.current.position = _this.displayedSteps[startIndex].position;
               _this.targetCurrent = _this.current.position;
               _this.current.fitBounds(_this.displayedSteps[startIndex].bounds);
               _this.current.scale(1.5);
               _this.current.onMouseDown = function(event) {
                   event.preventDefault();
                   _this.setCurrentStep5(_this.steps[_this.currentIndex].id, false, true, function() {
                       if (_this.stepCallback) {
                           _this.stepCallback(_this.steps[_this.currentIndex].id);
                       }
                   });
               };
         this.everything.addChild(_this.current);
         this.stepsDisplayed = true;
       },

           // Mouse handlers
           getStepMouseHandler:function(i) {
             var _this = this
               return function(event) {
                   event.preventDefault();
                   _this.setCurrentStep5(_this.steps[i].id, true, true, function() {
                       if (_this.stepCallback) {
                           _this.stepCallback(_this.steps[i].id);
                       }
                   });
               };
           },

           getChapterMouseHandler:function(i) {
             var _this = this
               return function(event) {
                   event.preventDefault();
                   _this.openChapter(i, true);
               };
           },

           setCurrentStep5:function(index, animate, skipChapter, callback) {

               var stepIndex = -1, chapterIndex = -1;
               // look for stepIndex
               for (var i=0;i<this.steps.length;i++) {
                   if (this.steps[i].id && this.steps[i].id === index) {
                       stepIndex = i;
                       break;
                   }
               }
               if (stepIndex > -1) {
                   // set target current position
                   step = this.displayedSteps[stepIndex];
                   if (!skipChapter) {
                       // look for corresponding chapter
                       for (var j=stepIndex; j>=0; j--) {
                           if (this.steps[j].chapter) {
                               for (var k=0; k<this.chapters.length;k++) {
                                   if (this.chapters[k] === this.displayedSteps[j]) {
                                       chapterIndex = k;
                                       break;
                                   }
                               }
                               break;
                           }
                       }
                       if (chapterIndex>-1) {
                           openChapter(chapterIndex, animate);
                       }
                   }
                   if (animate && this.current.visible === true) {
                       var delta, factor;
                       if (stepIndex < this.currentIndex) {
                           delta = -1;
                           factor = this.currentIndex - stepIndex;
                       } else {
                           delta = +1;
                           factor = stepIndex - this.currentIndex;
                       }
                       this.currentCallback = function() {
                           this.currentIndex += delta;
                           if (this.currentIndex === stepIndex) {
                               if (callback) {
                                   callback();
                               }
                           } else {
                               step = this.displayedSteps[this.currentIndex+delta];
                               this.setTargetCurrent(step.position, factor);
                           }
                       }
                       var step = this.displayedSteps[this.currentIndex+delta];
                       this.setTargetCurrent(step.position, factor);
                   } else {
                       this.current.visible = true;
                       this.currentIndex = stepIndex;
                       this.current.position = step.position;
                       this.targetCurrent = this.current.position;
                       if (callback) {
                           callback();
                       }
                   }

               } else {
                   console.error("Step with index "+index+" not found");
               }
           },


           /*
            *  API
            */

           // Init map
           init:function(canvasId, currentImage, newStepCallback, callback) {

               this.initView(canvasId);
               if (newStepCallback) {
                   this.stepCallback = newStepCallback;
               }
               this.initSymbols(currentImage, callback);
           },

           // load Path
           loadPath:function(data) {
               // create path from SVG data
               this.path = new paper.Path(data.data);
               this.path.fitBounds(paper.view.bounds.expand(-this.margin));
               if (data.color) {
                   this.path.strokeColor = data.color;
               }
               if (data.opacity) {
                   this.path.opacity = data.opacity;
               }

               if (data.width) {
                   this.path.strokeWidth = data.width;
               }

               this.everything = new paper.Group();
               this.everything.addChild(this.path);
               this.centerEverything();
           },

           /**
           *
           * data from declick ui
           */

           // load Path from json file
           loadPathFromUI:function(file, callback) {
             this.loadPath(file);
             if (callback) {
                 callback();
             }

           },
           // load steps from JSON file
           loadStepsFromUI:function(file, callback) {

             this.loadSteps(file);
               if (callback) {
                   callback();
               }
           },

           // load steps
           loadSteps:function(data) {
               if (this.stepsDisplayed) {
                       this.removeSteps();
               }
               this.initSteps(data);
               this.displaySteps();
               paper.view.draw();
           },

           // load steps from JSON file
           loadStepsFromJSON:function(file, callback) {
               var self = this;
               $.getJSON(file, function(stepsData) {
                   self.loadSteps(stepsData);
                   if (callback) {
                       callback();
                   }
               }).fail(function() {
                   console.error("Could not load JSON file: "+file);
               });
           },

           // Update data
           updateState:function(udpatedSteps) {
             var _this = this
               $.each(udpatedSteps, function(key, value) {
                   if (value.id) {
                       // find corresponding step
                       for (var i=0;i<_this.steps.length;i++) {
                           if (_this.steps[i].id && _this.steps[i].id === value.id) {
                               if (typeof value.passed !=='undefined') {
                                   _this.steps[i].passed = value.passed;
                               }
                               if (typeof value.visited !=='undefined') {
                                   _this.steps[i].visited = value.visited;
                               }
                               var old = _this.displayedSteps[i];
                               var point = old.position;
                               old.remove();
                               var symbol = _this.getSymbol(_this.steps[i]);
                               var placed = symbol.place(point);
                               _this.everything.addChild(placed);
                               _this.displayedSteps[i] = placed;
                               placed.onMouseDown = _this.getStepMouseHandler(i);
                               break;
                           }
                       }
                   }
               });
           },


           // Set current step
           setCurrentStep:function(index, animate) {
               if (typeof animate === 'undefined') {
                   animate = false;
               }
                 this.setCurrentStep(index, animate);
           },

           // Remove all steps
           removeSteps:function() {
               this.removeSteps();
           },

           // Update size
           update:function() {
               // check size
               var cSize = new paper.Size(this.$canvas.width(), this.$canvas.height());
               if (!cSize.equals(paper.view.size)) {
                   try {
                       window.dispatchEvent(new Event('resize'));
                   } catch (e) {
                       // Problem in IE: try the IE way
                       var evt = window.document.createEvent('UIEvents');
                       evt.initUIEvent('resize', true, false, window, 0);
                       window.dispatchEvent(evt);
                   }
               }
               // remove any precedently bound mousemove handlers
               this.$canvas.off("mousemove");
           }

}
