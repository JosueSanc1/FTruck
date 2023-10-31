  var data;
  var api_url =
    "http://localhost:5501/public/getCurrentRole";
  
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
        document.getElementById('sucursales').style.display = 'none';
        document.getElementById('vehiculos').style.display = 'none';
        document.getElementById('pilotos').style.display = 'none';
        document.getElementById('estadisticas').style.display = 'none';
        break;
      case 'gerente':
        document.getElementById('sucursales').style.display = 'none';
        document.getElementById('vehiculos').style.display = 'none';
        document.getElementById('pilotos').style.display = 'none';
        document.getElementById('rutas').style.display = 'none';
        break;
      default:
        break;
    }
  }
  getapi(api_url)



function renderMap(request){
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

  var map = new google.maps.Map(document.getElementById("map"), mapOptions)

  //servicio de direcciones
  var directionsService = new google.maps.DirectionsService();
  var directionsRender = new google.maps.DirectionsRenderer();
  directionsRender.setMap(map);

  directionsService.route(request, (result, status) => {
    if(status == google.maps.DirectionsStatus.OK){
      const output = document.querySelector('#ruta-info');
      output.innerHTML = "<div class='alert-info'> Origen: " + request.origin + ".<br />Destino: " + request.destination + ".<br /> Distancia: " + result.routes[0].legs[0].distance.text +  ".<br />Tiempo Estimado: "+result.routes[0].legs[0].duration.text + ".</div>";
      directionsRender.setDirections(result);
    }else{
      directionsRender.setDirections({routes: []});
      map.setCenter(mylatlng);
      const output = document.querySelector('#ruta-info');
      output.innerHTML ="<div class='alert-error'> Ruta no disponible</div>"
    }
  });
}

function calcRoute(){
  var request = {
    origin: document.getElementById("origen").value,
    destination: document.getElementById("destino").value,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC
  }
  directionsService.route(request, (result, status) => {
    if(status == google.maps.DirectionsStatus.OK){
      const output = document.querySelector('#ruta-info');
      output.innerHTML = "<div class='alert-info'> Origen: " + document.getElementById("origen").value + ".<br />Destino: " + document.getElementById("destino").value + ".<br /> Distancia: " + result.routes[0].legs[0].distance.text +  ".<br />Tiempo Estimado: "+result.routes[0].legs[0].duration.text + ".</div>";
      directionsRender.setDirections(result);
    }else{
      directionsRender.setDirections({routes: []});
      map.setCenter(mylatlng);
      const output = document.querySelector('#ruta-info');
      output.innerHTML ="<div class='alert-error'> Ruta no disponible</div>"
    }
  });
  const rutas = document.getElementById("rutas");
  const nuevaRuta = document.createElement("div");
  nuevaRuta.innerHTML = "<div class='ruta'><button class='ruta'>Juan Perez " +request.origin+" - "+request.destination+" C123SAT</button></div>"
  rutas.appendChild(nuevaRuta);
}



function rutas(origen, destino){
  var request = {
    origin: origen,
    destination: destino,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC
  }
  renderMap(request);
}
function calcRouteMonitor(request){
  directionsService.route(request, (result, status) => {
    if(status == google.maps.DirectionsStatus.OK){
      const output = document.querySelector('#ruta-info');
      output.innerHTML = "<div class='alert-info'> Origen: " + request.origin + ".<br />Destino: " + request.destination + ".<br /> Distancia: " + result.routes[0].legs[0].distance.text +  ".<br />Tiempo Estimado: "+result.routes[0].legs[0].duration.text + ".</div>";
      directionsRender.setDirections(result);
    }else{
      directionsRender.setDirections({routes: []});
      map.setCenter(mylatlng);
      const output = document.querySelector('#ruta-info');
      output.innerHTML ="<div class='alert-error'> Ruta no disponible</div>"
    }
  });
}