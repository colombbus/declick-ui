<template lang="html">
  <div id="contentContainerHome">
    <div id="onLoadGif">
      <img src="../assets/img/spinner.gif" alt="" />
      <p>Chargement...</p>
    </div>
    <div id="content"></div>
  </div>
</template>

<script>
import declickConfig from '../assets/config/declick.js'
export default {
  created(){
    this.$http.get( declickConfig.url.cms+'api/1/tables/pages/rows/1?access_token=jWNoVhWCng6odNLK').then((responce) => {
      $('#onLoadGif').fadeOut()
      $('#content').append($.parseHTML(responce.body.content)).fadeIn()
    })
  }
}
</script>

<style lang="css">
  #onLoadGif{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #onLoadGif img{
    height: 50px
  }
  #onLoadGif p{
    font-weight: bolder;
  }


  #content {text-align:justify;font-family: "DejaVu Sans",Helvetica,Arial,sans-serif;}


  #content p
  {margin-left:100px;margin-right:100px;}

  #content table,
  #enseignants-animateurs #content table
  {padding-left:100px;padding-right:100px;box-sizing:border-box;width:initial;}

  #content table a
  {display:block;text-decoration:none;color:#480a2a;margin:10px 0;text-align:center;}

  #content table a:hover,
  #content table a:active
  {display:block;text-decoration:none;color:#ba0000;}

  #content h1 {font-size:24pt;line-height:40px;letter-spacing:-2px;margin:30px 0 40px 0;text-align:left;text-transform:uppercase;font-family:"rubik";text-align:center;font-weight:500}
  #content h1 {text-align:center;margin-left:100px; margin-right:100px;}
  #content h2 {font-size:19pt;line-height:37px;letter-spacing:-1px;margin:150px 0 90px 0;text-transform: uppercase;font-family:'rubik';color:#FFFFFF; background-color:#480A2A;text-align:center;position:relative;}
  #content h3 {font-family:arial;font-size:18px;margin:20px 0 7px 0;text-transform: uppercase;font-weight:600;}
  #content h4 {font-family:arial;font-size:16px;color:#1a1a1a;margin:25px 0 10px 0;}
  #content h5 {font-family:arial;font-size:14px;color:#1a1a1a;margin:25px 0 10px 0;}
  #content h6 {font-family:arial;font-size:10px;color:#1a1a1a;margin:25px 0 10px 0;}

  #content .page-text {font-size:16px;line-height:22px;}
  #content .page-text p, #content .page-text ul, #content .page-text ol {margin:0 0 22px 0;}
  #content .page-text ul, #content .page-text ol {margin-left:25px;}
  #content .page-text ul ul, #content .page-text ol ul, #content .page-text ul ol, #content .page-text ol ol {
  	margin:0 0 0 25px;
  }
  #content .page-text blockquote {
  	margin:0 0 22px 20px;
  	line-height: 19px;
  	font-size:13px;
  	color:#666;
  	font-style:italic;
  	border-left:2px solid #ccc;
  	padding:0 0 0 15px;
  	}
  /*
  #content code {border:1px dotted #ececec;padding:2px;font-family: Consolas, Monaco, "Courier New", Courier, monospace;font-size: 12px;background:#f9f9f9;color:#000;}
  #content pre code {line-height:17px;padding:15px;border:1px dotted #ececec;font-family: Consolas, Monaco, "Courier New", Courier, monospace;font-size: 12px;background:#f9f9f9;color:#000;margin-bottom:22px;display:block;}
  */


  #content .page-text img {margin:0 0 0 0;border:none;vertical-align:bottom;}
  .code-declick {
  	background-color: #d7d7d7;
      border-radius: 18px;
      padding: 28px;
  	width:500px;
  }
  a#declick{
  color:#e47637;
  }
  a#declick:hover{
  color:red;
  }

  #box-content {
  	max-height:200px;
  	overflow-y:scroll;
  	overflow-x:hidden;
  }

  #content table {
  	text-align:left;
  }

  #content table td {
  	vertical-align:top;
  }

  #sommaire, #quoi, #qui, #ensemble, #logos {
  	table-layout: fixed;
  	border-spacing:15px;
  }

  #sommaire {
  	margin:7px;
  	box-sizing:border-box;
  	border-spacing:15px;
  }

  #sommaire td {
  	padding-right:15px;
  	position:relative;
  }

  #content #sommaire td p {
  	margin:0 0 50px 0;
  }

  #sommaire td a {
  	display:block;
  	position:absolute;
  	bottom:0;
  	right:15px;
  	text-transform: uppercase;
  	color:#FFFFFF;
  	background-color:#480A2A;
  	min-width:100px;
  	text-align:center;
  	text-decoration:none;
  	font-family:"rubik";
  	padding:7px 7px;
  	font-weight:500;
  	font-size:1.1em;
  }

  #content h2:nth-of-type(1) img {
  		position:absolute;
  		right:0;
  		top:-75px;
  }

  #content h2:nth-of-type(2) img {
  		position:absolute;
  		left:0;
  		top:-75px;
  }

  #quoi {
  	margin:7px;
  }

  #quoi td ul li {
  	list-style-image: url('../assets/img/yellow.png');
  }

  #qui, #ensemble, #logos {
  	max-width:800px;
  	margin-left:auto;
  	margin-right:auto;
  }

  #qui td {
  	position:relative;
  	padding-right:15px;
  }

  #content #qui td p {
  	margin-bottom:50px;
  }

  #qui td a {
  	position:absolute;
  	bottom:0;
  	right:15px;
  	color:#480A2A;
  	font-size:0.9em;
  }

  #logos td {
  	text-align:center;
  	width:50%;
  }

  #logos td img {
  	padding:0 20px;
  }

  #partenaires {
  	margin-top:-90px;
  	background-color:#480A2A;
  	text-align:center;
  	padding:30px 0px;
  }

  #content #partenaires img {
  	display:inline-block;
  	margin:0 10px;
  }

  #enseignants-animateurs #wrapper {
  	max-width:800px;
  	margin-left:auto;
  	margin-right:auto;
  }

  #enseignants-animateurs #content h3 { font-family:arial;font-size:18px;margin:20px 0 20px 0;text-transform: none;font-weight:600;}

  #enseignants-animateurs #content #sections h3,
  #enseignants-animateurs #content #outils h3
  {margin:20px 0 0 7px;text-transform: uppercase;}

  #sections p{
  	padding-left: 7px;
  	padding-right: 7px;
  }

  #sections {
  	margin-top:30px;
  	margin-bottom:40px;
  }

  #outils p{
  	padding-left: 7px;
  	padding-right: 7px;
  }

  #animateurs {
  	display: block;
  	position:absolute;
  	width:144px;
  	height:144px;
  	background-image:url("../assets/img/animateurs.png");
  	left:0;
  	right:0;
  	margin-left:auto;
  	margin-right:auto;
  	color:transparent;
  }

  #animateurs:hover {
  	background-image:url("../assets/img//animateurs_on.png");
  }

  #content .page-text img#image_contact {
  	margin-top:12px;
  }

  #enseignants-animateurs #content table a
  {text-decoration:none;color:#480a2a;}

  #enseignants-animateurs #content table a:hover,
  #enseignants-animateurs #content table a:active
  {text-decoration:none;color:#ba0000;}
</style>
