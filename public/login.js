var usuario;
var origen;
var destino;

function create(){
  var login = {
    user: document.getElementById("user").value,
    pass: document.getElementById("pass").value
  }
  let postObj = { 
    usuario: login.user
  }
  let post = JSON.stringify(postObj)
  const url = "setCurrentUser"
  let xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
  xhr.send(post);
  xhr.onload = function () {
      if(xhr.status === 201) {
          console.log("Post successfully created!") 
      }
  }
  var data;
  var api_url =
    "http://localhost:5501/public/loginCheck/"+login.user+"/"+login.pass;
  
  async function getapi(url) {   
    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    data = await response.json();
    var firstObj = data[0];
    var firstKey = Object.keys(firstObj)[0];
    var firstKeyValue = firstObj[firstKey];
    console.log(firstKeyValue);
    if(firstKeyValue == 1){
      var data;
      var api_url =
        "http://localhost:5501/public/checkRole/"+login.user;
      
      async function getapi(url) {   
        // Storing response
        const response = await fetch(url);

        // Storing data in form of JSON
        data = await response.json();
        var firstObj = data[0];
        var firstKey = Object.keys(firstObj)[0];
        var firstKeyValue = firstObj[firstKey];
        console.log(firstKeyValue);
        switch(firstKeyValue){
          case 'monitorista':
          case 'gerente':
          case 'supervisor':
            window.location = 'index.html'
            break;
          case 'piloto':
            window.location = "piloto.html"
            break;
          default:
            const loginBox = document.getElementById("login-box");
            const error = document.createElement("div");
            error.innerHTML = "<div class='error'>CREDENCIALES INVALIDAS</div>"
            loginBox.appendChild(error);
            break;
        }
      }
      getapi(api_url);
    }
  }
  // Calling that async function
  getapi(api_url);
}

function calcRoutePiloto(){
  document.getElementById("table-wrapper").style.display = 'none';
  //variables para mapa
  var mylatlng = {
    lat: 14.8446,
    lng: -91.5232
  }
  var mapOptions = {
    center: mylatlng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  var data;
  var api_url =
    "http://localhost:5501/public/getLatestRuta";
  
  async function getapi(url) {   
    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    data = await response.json();
    var firstObj = data[0];
    var firstKey = Object.keys(firstObj)[0];
    var secondKey = Object.keys(firstObj)[1];
    var firstKeyValue = firstObj[firstKey];
    var secondKeyValue = firstObj[secondKey];
    console.log(firstKeyValue);
    console.log(secondKeyValue);

    var map = new google.maps.Map(document.getElementById("map"), mapOptions)
  
    //servicio de direcciones
    var directionsService = new google.maps.DirectionsService();
    var directionsRender = new google.maps.DirectionsRenderer();
    directionsRender.setMap(map);
    
    var request = {
      origin: firstKeyValue,
      destination: secondKeyValue,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    }
    
    directionsService.route(request, (result, status) => {
      if(status == google.maps.DirectionsStatus.OK){
        const output = document.querySelector('#ruta-info-piloto');
        output.innerHTML = "<div class='alert-info'> Origen: " + request.origin + ".<br />Destino: " + request.destination + ".<br /> Distancia: " + result.routes[0].legs[0].distance.text +  ".<br />Tiempo Estimado: "+result.routes[0].legs[0].duration.text + ".</div>";
        directionsRender.setDirections(result);
      }else{
        directionsRender.setDirections({routes: []});
        map.setCenter(mylatlng);
        const output = document.querySelector('#ruta-info-piloto');
        output.innerHTML ="<div class='alert-error'> Ruta no disponible</div>"
      }
    });
  }
  getapi(api_url);
}