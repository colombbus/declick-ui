<template lang="html">
  <div class="decouvrir">
    <div class="topContent">
      <h1>À toi de jouer !</h1>
      <p>C’est ici que tu trouveras les jeux et applications créés avec Declick
         que les autres utilisateurs ont mis en ligne. Tu peux bien sûr les
         essayer à l’infini ! Tu pourras aussi voir le code utilisé pour chacun
         de ces jeux et t’en inspirer pour créer les tiens. Partage ensuite tes
          créations et participe à la communauté Declick !</p>
    </div>
    <h2>Restitution Declick 2016</h2>
    <ul class="gameList">
      <li class="listElement" v-for="game in games">
        <a :href="game.execute" target="_blank">
        <img :src="game.imgSrc" alt="" /><br>
            {{game.name}}<br>
            {{game.createAt}}
        </div>
        </a>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  data () {
    return {
      games: [
        { name:'Donut Adventures (Les donuts)',
          createAt: 'Collège Edouard Pailleron, Paris',
          imgSrc: 'http://pages.declick.net/data/uploads/jeux/jeu1.png',
          execute: 'http://create.declick.net/server/web/project/execute/1463'
        },
        { name:'Toilet Time (Toilets Studio)',
          createAt: 'Collège Bernard Palissy, Paris',
          imgSrc: 'http://pages.declick.net/data/uploads/jeux/jeu2.png',
          execute: 'http://create.declick.net/server/web/project/execute/1486'
        },
        { name:'Lola & Ben (Forest Studio)',
          createAt: 'Collège Bernard Palissy, Paris',
          imgSrc: 'http://pages.declick.net/data/uploads/jeux/jeu3.png',
          execute: 'http://create.declick.net/server/web/project/execute/1485'
        },
        { name:'The Lost Way (Griffondor)',
          createAt: 'Collège Bernard Palissy, Paris',
          imgSrc: 'http://pages.declick.net/data/uploads/jeux/jeu4.png',
          execute: 'http://create.declick.net/server/web/project/execute/1487'
        }]
      }
  }

}
</script>

<style lang="css">
.decouvrir{
  font-family: "DejaVu Sans",Helvetica,Arial,sans-serif;
}
  .listElement{
    display: inline-block;
    text-align: center;
    width: 49%;
    margin: 0 auto;
  }
  .decouvrir h2{
    font-size: 19pt;
    line-height: 37px;
    letter-spacing: -1px;
    margin: 100px 0 90px 0;
    text-transform: uppercase;
    font-family: 'rubik';
    color: #FFFFFF;
    background-color: #480A2A;
    text-align: center;
    position: relative;
  }
  .topContent{
    color: #480A2A;
    text-align: left;
    margin: 0 100px
  }
  .topContent h1{
    font-size: 24pt;
    line-height: 40px;
    letter-spacing: -2px;
    margin: 30px 0 40px 0;
    text-align: left;
    text-transform: uppercase;
    font-family: "rubik";
    font-weight: 500;
  }
  .topContent p {
    font-size: 16px;
    line-height: 22px;
  }
  .listElement a {
    display: block;
text-decoration: none;
color: #480a2a;
margin: 10px 0;
text-align: center;
font-size: 16px;
line-height: 22px;
  }
</style>
