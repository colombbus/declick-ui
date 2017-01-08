<template lang="html">
  <div id="progresserContainer">
    <nav id="circuits-tabs">
      <a @click="categoryFilter = 'official'"
         v-bind:class="{ active: categoryFilter === 'official' }"
      >Parcours officiels</a>
      <a @click="categoryFilter = 'custom'"
         v-bind:class="{ active: categoryFilter === 'custom' }"
      >Parcours personnalisés</a>
    </nav>

    <div v-for="circuit in filteredCircuits" class="circuit">
      <div class="imgLevel">
        <img :src="circuit.imageUrl" :alt="circuit.title"/>
      </div>
      <div class="contentCircuit">
        <router-link to="DeclickMap">{{circuit.title}}</router-link>
        <p class="descriptionCircuit">{{circuit.description}}</p>
        <div v-if="circuit.info" class="moreInfo">
          <p @click="toggleShow(circuit)" v-show="!circuit.showInfo"><span class="glyphicon glyphicon-triangle-right"></span> plus d'infos</p>
          <p @click="toggleShow(circuit)" v-show="circuit.showInfo"><span class="glyphicon glyphicon-triangle-bottom"></span> {{circuit.info[0]}}</p>
          <div v-show="circuit.showInfo">
            <p>{{circuit.info[1]}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      categoryFilter: 'official',
      circuits: [{
        title: "Bob & Max",
        category: 'official',
        description: "Apprends à créer un petit jeu..",
        imageUrl: "http://www.declick.net/images/default-level.png",
        info: [ 'Niveau indicatif : Cycle 3',
                'Compétences abordées : Objets, actions, paramètres '+
                '(texte et numérique), boucles, conditions.'
              ],
        showInfo: false
      }, {
        title: "D-Clics numériques",
        category: 'official',
        description: "Séances 4 à 7 du parcours D-Clics numériques",
        imageUrl: "http://www.declick.net/images/dclics.png",
        info:[ 'Niveau indicatif : 8 à 14 ans',
               'D-Clics numériques est un projet de formation, d’animation et'+
               'de mobilisation autour des parcours éducatifs numériques destinés'+
               ' aux enfants et aux jeunes de 8 à 14 ans.'
             ],
        showInfo: false
      }, {
        title: "Castor",
        category: 'custom',
        description: '',
        imageUrl: 'http://www.castor-informatique.fr/img/castor_small.png',
        info: null,
        showInfo: false
      }
    ]}
  },
  computed: {
    filteredCircuits () {
      return this.circuits.filter((circuit) =>
        circuit.category === this.categoryFilter
      )
    }
  },
  methods: {
    toggleShow (circuit) {
      circuit.showInfo = !circuit.showInfo
    }
  }
}
</script>

<style lang="css">

#circuits-tabs {
	border-bottom: 3px solid #480A2A;
}

#circuits-tabs a {

  display: inline-block;
  position: relative;
  padding: 10px 15px;
  font-family: 'Rubik', sans-serif;
  font-size: 14pt;
  cursor: pointer;
  text-decoration: none;

  color: white;
  cursor: default;
  background-color: #642D46;
  border-bottom-color: transparent;


  margin-right: 5px;
  line-height: 1.42857143;
  border-radius: 16px 16px 0 0;

}

#circuits-tabs a.active {
  background-color: #480A2A;
}

  #progresserContainer{
    margin: 50px auto;
    max-width: 800px;
  }
  .circuit div{
    vertical-align: top;
    display: inline-block;
    color: #337ab7;
  }
  .circuit div .titleCircuit:hover{
    color:#23527c
  }
  .circuit{
    border: 2px solid #e7e6e6;
    margin-top: 20px;
  }
  .circuit .imgLevel{
    width: 150px;
  }
  .titleCircuit{
    cursor: pointer;
    font-weight: 700;
    font-size: 18pt;
  }
  .descritionCircuit{
    font-size: 14pt;
  }
  .contentCircuit{
    padding: 15px;
    max-width: 80%;
  }
  .moreInfo p{
    cursor: pointer
  }
  .moreInfo p,
  .moreInfo div{
    color: #a6a6a6
  }
  .moreInfo > div{
    margin-left: 17px;
  }
</style>
