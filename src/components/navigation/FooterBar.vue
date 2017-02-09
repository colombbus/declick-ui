<template>
  <div id="footer">
    Réalisé par
    <a target="_blank" href="http://www.colombbus.org/">Colombbus</a>
    <a href="mailto:declick@colombbus.org" class="right-aligned">
      Contactez-nous !
      <span class="glyphicon glyphicon-envelope"></span>
    </a>
  </div>
</template>

<style>
#footer {
  clear: both;
  height: 25px;
  border-top: 1px solid #D1D718;
  padding: 0 5px;
  font-size: 12pt;
  color: #D1D718;
  background-color: #480A2A;
}

#footer a {
  color: #D1D718;
  text-decoration: none;
}

#footer .glyphicon {
  position: relative;
  top: 2px;
}

#footer .right-aligned {
  float: right;
}
</style>
