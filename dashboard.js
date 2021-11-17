/* globals Chart:false, feather:false */
function myFunction(id) {

  document.getElementById(id).innerText = ppFunction(id);
  var popup = document.getElementById(id);
  popup.classList.toggle("show");
}

function ppFunction(county){
  return county;
}
