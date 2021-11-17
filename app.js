/* globals Chart:false, feather:false */
function myFunction(id,county) {

  document.getElementById(id).innerText = ppFunction(county);
  var popup = document.getElementById(id);
  popup.classList.toggle("show", true);
}

function ppFunction(county){
  return county;
}

(function () {
  'use strict'
  feather.replace({ 'aria-hidden': 'true' })
})()