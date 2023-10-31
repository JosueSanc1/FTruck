function navegacion(string){
  var request = new XMLHttpRequest();

  request.open('GET', string, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var resp = request.responseText;
      document.querySelector('#included-content-main').innerHTML = resp;
    }
  };
  request.send();
}

function salir(){
  window.location = "login.html"
}