<template lang="html">
  <div id="declickMap">
    <!--<div id="text"></div>-->
    <canvas id="map" ></canvas>
  </div>

</template>

<script>
import  map  from'../assets/js/map.js'
var bot = require('../assets/robot.svg')
export default {
  data () {
    return {
      json: {
          "data": "M25.255,63.302c32.97-3.167,63.481-17.886,96.522-21.262c31.374-3.206,62.175-4.643,94.51-4.328c45.235,0.439,113.158,22.029,128.641,66.525c10.522,30.243,11.189,71.242-8.883,97.309c-23.825,30.939-55.704,40.616-89.128,60.174c-39.078,22.867-39.078,22.867-75.06,47.575c-35.261,24.213-87.611,59.112-92.27,102.089c-2.703,24.943,7.114,54.339,21.787,74.96c28.008,39.363,65.192,80.229,111.434,101.433c55.587,25.485,112.499,36.663,173.848,39.621c57.567,2.778,111.682,2.036,162.889-24.55c39.235-20.368,69.451-54.185,69.977-97.74c0.375-31.134-11.793-55.753-22.851-84.559c-11.122-28.972-16.033-58.073-15.71-88.649c0.292-27.768,11.396-54.101,35.71-70.92c25.972-17.969,54.402-25.999,72.833-52.986c33.826-49.535,12.82-134.523,70.377-170.015c65.75-40.539,163.432,7.745,209.688,53.859c34.891,34.786,57.88,91.84,58.417,139.253c0.237,20.913,3.027,44.543-1.792,64.917c-5.568,23.546-19.611,34.563-39.299,48.274c-40.057,27.902-78.061,62.405-88.834,109.851c-4.686,20.627-9.176,46.802,1.037,66.749c6.909,13.499,19.683,26.981,31.945,36.569c52.711,41.21,131.881,44.271,196.91,44.396c84.241,0.162,148.639-52.938,177.451-124.24c23.287-57.621,31.08-113.144,31.07-174.281c-0.009-49.22-22.069-102.894-12.887-151.773c4.817-25.648,43.632-57.636,68.898-66.53c30.76-10.827,67.95,3.379,96.806,13.133",
          "color": "#CFBFC7",
          "width": 7,
          "opacity": "0.4"
      },
      steps: [
          {
              "name": "CREATION D'UN COMPTE",
              "passed": false,
              "id": 0,
              "steps": [
                  {
                      "name":"Bienvenue",
                      "passed":false,
                      "id": 1
                  },
                  {
                      "name":"Objectifs",
                      "passed":false,
                      "id": 2
                  },
                  {
                      "name":"Instructions",
                      "passed":false,
                      "id": 3
                  },
                  {
                      "name":"Informations utiles",
                      "passed":false,
                      "id": 4
                  }
              ]
          },
          {
              "name": "QUELQUES RAPPELS",
              "passed": false,
              "id": 5,
              "steps": [
                  {
                      "name":"Minuscules",
                      "passed":false,
                      "id": 6
                  },
                  {
                      "name":"Petites et grandes lettres",
                      "passed":false,
                      "id": 7
                  },
                  {
                      "name":"Majuscules",
                      "passed":false,
                      "id": 8
                  },
                  {
                      "name":"Des signes mathématiques",
                      "passed":false,
                      "id": 9
                  },
                  {
                      "name":"La formule",
                      "passed":false,
                      "id": 10
                  },
                  {
                      "name":"Point final",
                      "passed":false,
                      "id": 11
                  },
                  {
                      "name":"Le point",
                      "passed":false,
                      "id": 12
                  }
              ]
          },
          {
              "name": "BOB LE ROBOT",
              "id": 13,
              "steps": [
                  {
                      "name":"Création",
                      "passed":false,
                      "id": 14
                  },
                  {
                      "name":"Le robot est créé",
                      "passed":false,
                      "id": 15
                  },
                  {
                      "name":"En avant...",
                      "passed":false,
                      "id": 16
                  },
                  {
                      "name":"...en arrière",
                      "passed":false,
                      "id": 17
                  },
                  {
                      "name":"En route vers la sortie",
                      "passed":false,
                      "id": 18
                  },
                  {
                      "name":"Descendons",
                      "passed":false,
                      "id": 19
                  },
                  {
                      "name":"Des hauts et des bas",
                      "passed":false,
                      "id": 20
                  },
                  {
                      "name":"Labyrinthe 1",
                      "passed":false,
                      "id": 21
                  },
                  {
                      "name":"Les paramètres",
                      "passed":false,
                      "id": 22
                  },
                  {
                      "name":"Labyrinthe 2",
                      "passed":false,
                      "id": 23
                  },
                  {
                      "name":"Cases numérotées",
                      "passed":false,
                      "id": 24
                  },
                  {
                      "name":"Il tombe !",
                      "passed":false,
                      "id": 25
                  }
              ]
          },
          {
              "name": "MAX LE MACON",
              "id": 26,
              "steps": [
                  {
                      "name":"Un maçon pour aider",
                      "passed":false,
                      "id": 27
                  },
                  {
                      "name":"La cédille",
                      "passed":false,
                      "id": 28
                  },
                  {
                      "name":"Ajoutons un maçon",
                      "passed":false,
                      "id": 29
                  },
                  {
                      "name":"Une porte pour entrer",
                      "passed":false,
                      "id": 30
                  },
                  {
                      "name":"Un sol pour ne pas tomber",
                      "passed":false,
                      "id": 31
                  },
                  {
                      "name":"Première plateforme",
                      "passed":false,
                      "id": 32
                  },
                  {
                      "name":"Répéter",
                      "passed":false,
                      "id": 33
                  },
                  {
                      "name":"Les accolades",
                      "passed":false,
                      "id": 34
                  },
                  {
                      "name":"Deuxième plateforme",
                      "passed":false,
                      "id": 35
                  },
                  {
                      "name":"Un mur",
                      "passed":false,
                      "id": 36
                  },
                  {
                      "name":"Un escalier",
                      "passed":false,
                      "id": 37
                  },
                  {
                      "name":"Plateforme à trous",
                      "passed":false,
                      "id": 38
                  },
                  {
                      "name":"Poser une ligne",
                      "passed":false,
                      "id": 39
                  },
                  {
                      "name":"Parcours libre",
                      "passed":false,
                      "id": 40
                  }
              ]
          },
          {
              "name": "ITEM",
              "id": 41,
              "steps": [
                  {
                      "name":"Les guillemets",
                      "passed":false,
                      "id": 42
                  },
                  {
                      "name":"Une clé",
                      "passed":false,
                      "id": 43
                  },
                  {
                      "name":"Une clé pour ouvrir la porte",
                      "passed":false,
                      "id": 44
                  },
                  {
                      "name":"Parcours libre",
                      "passed":false,
                      "id": 45
                  },
                  {
                      "name":"Des sous !",
                      "passed":false,
                      "id": 46
                  },
                  {
                      "name":"Les tests",
                      "passed":false,
                      "id": 47
                  },
                  {
                      "name":"Jour, Nuit",
                      "passed":false,
                      "id": 48
                  },
                  {
                      "name":"Des sous ! Mais où ?",
                      "passed":false,
                      "id": 49
                  },
                  {
                      "name":"Les deux portes",
                      "passed":false,
                      "id": 50
                  },
                  {
                      "name":"Vie et poison",
                      "passed":false,
                      "id": 51
                  },
                  {
                      "name":"La vie en rouge",
                      "passed":false,
                      "id": 52
                  }
              ]
          },
          {
              "name": "LE CLAVIER",
              "id": 53,
              "steps": [
                  {
                      "name":"Un d pour avancer",
                      "passed":false,
                      "id": 54
                  },
                  {
                      "name":"Les tests",
                      "passed":false,
                      "id": 55
                  },
                  {
                      "name":"Jusqu'à l'infini !",
                      "passed":false,
                      "id": 56
                  },
                  {
                      "name":"Aller et retour",
                      "passed":false,
                      "id": 57
                  }
              ]
          },
          {
              "name": "CREER TON JEU VIDEO",
              "passed":false,
              "id": 58
          }
      ],
      map
    }
  },
  mounted () {
    this.map.init("map", bot, (index) => {
    }, () => {
        // Load path
        this.map.loadPathFromUI(this.json, () => {
            // Load steps
            this.map.loadStepsFromUI(this.steps)
        })
    })
  }
}
</script>

<style lang="css">
#declickMap {
    background-color:#000000;
}
#map {
    width:100%;
    height:100%;
    background-color:#46102A;
    margin-right:auto;
    margin-left:auto;
}
#text {
    color:#FFFFFF;
}
</style>
