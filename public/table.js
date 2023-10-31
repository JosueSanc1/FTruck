function populateTable(tableName){
    var $table = $('#table');
    var myData;
    const api_url =
      "http://localhost:5501/public/get"+tableName;
    
    async function getapi(url) {   
      // Storing response
      const response = await fetch(url);
  
      // Storing data in form of JSON
      myData = await response.json();

      $(function () {
        $('#table').bootstrapTable({
            data: myData
        });
      });
      $('#table').bootstrapTable('load', myData);
      $('#table').on('click-row.bs.table', function (e, row, $element) {
        switch(tableName){
            case 'Sucursales':
                document.getElementById("id").value = row.id
                document.getElementById("nombreSucursal").value = row.nombreSucursal
                document.getElementById("direccion").value = row.direccion
                document.getElementById("telefono").value = row.telefono
                break;
            case 'Pilotos':
                document.getElementById("id").value = row.id
                document.getElementById("dpi").value = row.dpi
                document.getElementById("nit").value = row.nit
                document.getElementById("nombre").value = row.nombre
                document.getElementById("apellido").value = row.apellido
                document.getElementById("telefono").value = row.telefono
                break;
            case 'Vehiculos':
                document.getElementById("id").value = row.id
                document.getElementById("placa").value = row.placa
                document.getElementById("marca").value = row.marca
                document.getElementById("linea").value = row.linea
                document.getElementById("modelo").value = row.modelo
                document.getElementById("kilometraje").value = row.kilometraje
                break;
            default:
                break;
        }
      });
      $(document).ready(function(){
        $("#myInput").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
    }
    // Calling that async function
    getapi(api_url);
}
function populateRutas(tableName){
    var $table = $('#table');
    var myData;
    const api_url =
      "http://localhost:5501/public/get"+tableName;
    
    async function getapi(url) {   
      // Storing response
      const response = await fetch(url);
  
      // Storing data in form of JSON
      myData = await response.json();

      $(function () {
        $('#table').bootstrapTable({
            data: myData
        });
      });
      $('#table').bootstrapTable('load', myData);
      $('#table').on('click-row.bs.table', function (e, row, $element) {
        document.getElementById("idSelect").value = row.id
        document.getElementById("pilotoSelect").value = row.piloto
        document.getElementById("vehiculoSelect").value = row.vehiculo
        document.getElementById("origenSelect").value = row.nombreOrigen
        document.getElementById("destinoSelect").value = row.nombreDestino
        $.getscript("/app.js", rutas(row.origen, row.destino));
      });
      $(document).ready(function(){
        $("#myInput").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
    }
    // Calling that async function
    getapi(api_url);
}
function populateStatistics(){
    var $table = $('#table');
    var myData;
    const api_url =
      "http://localhost:5501/public/getPilotoRutas";
    async function getapi(url) {   
      const response = await fetch(url);
      myData = await response.json();
      $(function () {
        $('#table').bootstrapTable({
            data: myData
        });
      });
      $('#table').bootstrapTable('load', myData);
      $(document).ready(function(){
        $("#myInput").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
    }
    getapi(api_url);
    const api_url2 =
      "http://localhost:5501/public/getVehiculoRutas";
    async function getapi2(url) {   
      const response = await fetch(url);
      var myData2 = await response.json();
      $(function () {
        $('#table2').bootstrapTable({
            data: myData2
        });
      });
      $('#table2').bootstrapTable('load', myData2);
      $(document).ready(function(){
        $("#myInput2").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#myTable2 tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
    }
    getapi2(api_url2);
}

function addRuta(){
    var postObj = { 
        piloto: document.getElementById("pilotoSelect").value, 
        vehiculo: document.getElementById("vehiculoSelect").value, 
        origen: document.getElementById("origenSelect").value,
        destino: document.getElementById("destinoSelect").value,
        km: null
    }
      var request = {
        origin: "",
        destination: "",
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    }
    var myData;
    const api_url =
      "http://localhost:5501/public/getAddress/"+postObj.origen;
    async function getapi(url) {   
      const response = await fetch(url);
      myData = await response.json();
      console.log(myData);
      for(var key in myData){
        var data = myData[key];
        request.origin = data.direccion
      }
    }
    getapi(api_url);
    const api_url2 =
      "http://localhost:5501/public/getAddress/"+postObj.destino;
    async function getapi2(url) {   
      const response2 = await fetch(url);
      myData = await response2.json();
      console.log(myData)
      for(var key in myData){
        var data = myData[key];
        request.destination = data.direccion
      }
    }
    getapi2(api_url2);
    console.log(request)
    
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, (result, status) => {
        if(status == google.maps.DirectionsStatus.OK){
          var kilom = result.routes[0].legs[0].distance.text;
          var km = kilom.replaceAll("km", "");
          postObj.km = km;
          console.log(postObj.km);
        }else{
          console.log("error")
        }
    });
    let post = JSON.stringify(postObj)
    const url = "addRuta"
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(post);
    xhr.onload = function () {
        if(xhr.status === 201) {
            console.log("Post successfully created!") 
        }
    }
    populateRutas('Rutas');
}
function postRuta(postUrl){
    let postObj = { 
        id: +document.getElementById("idSelect").value,
        piloto: document.getElementById("pilotoSelect").value, 
        vehiculo: document.getElementById("vehiculoSelect").value,
        origen: document.getElementById("origenSelect").value,
        destino: document.getElementById("destinoSelect").value, 
        km: 0
    }
    let post = JSON.stringify(postObj)
    const url = postUrl
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(post);
    xhr.onload = function () {
        if(xhr.status === 201) {
            console.log("Post successfully created!") 
        }
    }
    populateRutas('Rutas');
}

function populateIdSelect(){
    removeOptions(document.getElementById('idSelect'));
    var myData;
    const api_url =
      "http://localhost:5501/public/getRutaID";
    
    async function getapi(url) {   
      // Storing response
      const response = await fetch(url);
  
      // Storing data in form of JSON
      myData = await response.json();
      var select = document.getElementById("idSelect");
      for(var key in myData){
        var data = myData[key];
        select.options[select.options.length] = new Option(data.id);
      }
    }
    getapi(api_url);
}
function populatePilotoSelect(){
    removeOptions(document.getElementById('pilotoSelect'));
    var myData;
    const api_url =
      "http://localhost:5501/public/getRutaPilotos";
    
    async function getapi(url) {   
      // Storing response
      const response = await fetch(url);
  
      // Storing data in form of JSON
      myData = await response.json();
      var select = document.getElementById("pilotoSelect");
      for(var key in myData){
        var data = myData[key];
        select.options[select.options.length] = new Option(data.nombre);
      }
    }
    getapi(api_url);
}    
function populateVehiculoSelect(){
    removeOptions(document.getElementById('vehiculoSelect'));
    var myData;
    const api_url =
      "http://localhost:5501/public/getRutaVehiculos";
    
    async function getapi(url) {   
      // Storing response
      const response = await fetch(url);
  
      // Storing data in form of JSON
      myData = await response.json();
      var select = document.getElementById("vehiculoSelect");
      for(var key in myData){
        var data = myData[key];
        select.options[select.options.length] = new Option(data.placa);
      }
    }
    getapi(api_url);
}
function populateSucursalesSelect(){
    removeOptions(document.getElementById('origenSelect'));
    removeOptions(document.getElementById('destinoSelect'));
    var myData;
    const api_url =
      "http://localhost:5501/public/getRutaSucursales";
    
    async function getapi(url) {   
      // Storing response
      const response = await fetch(url);
  
      // Storing data in form of JSON
      myData = await response.json();
      var select = document.getElementById("origenSelect");
      var select2 = document.getElementById("destinoSelect");
      for(var key in myData){
        var data = myData[key];
        select.options[select.options.length] = new Option(data.nombreSucursal);
        select2.options[select.options.length] = new Option(data.nombreSucursal);
      }
    }
    getapi(api_url);
}    
function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i > 0; i--) {
       selectElement.remove(i);
    }
 }

function addPiloto(){
    let postObj = { 
        dpi: document.getElementById("dpi").value, 
        nit: +document.getElementById("nit").value, 
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        telefono: +document.getElementById("telefono").value
    }
    let post = JSON.stringify(postObj)
    const url = "addPiloto"
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(post);
    xhr.onload = function () {
        if(xhr.status === 201) {
            console.log("Post successfully created!") 
        }
    }
    clearPilotoInputs();
}
function postPiloto(postUrl){
    let postObj = { 
        id: +document.getElementById("id").value,
        dpi: document.getElementById("dpi").value, 
        nit: +document.getElementById("nit").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value, 
        telefono: +document.getElementById("telefono").value
    }
    let post = JSON.stringify(postObj)
    const url = postUrl
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(post);
    xhr.onload = function () {
        if(xhr.status === 201) {
            console.log("Post successfully created!") 
        }
    }
    clearPilotoInputs();
}
function clearPilotoInputs(){
    document.getElementById("id").value = ""
    document.getElementById("dpi").value = ""
    document.getElementById("nit").value = ""
    document.getElementById("nombre").value = ""
    document.getElementById("apellido").value = ""
    document.getElementById("telefono").value = ""
}

function addSucursal(){
    let postObj = { 
        nombreSucursal: document.getElementById("nombreSucursal").value, 
        direccion: document.getElementById("direccion").value, 
        telefono: +document.getElementById("telefono").value
    }
    let post = JSON.stringify(postObj)
    const url = "addSucursal"
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(post);
    xhr.onload = function () {
        if(xhr.status === 201) {
            console.log("Post successfully created!") 
        }
    }
    clearSucursalInputs();
}
function postSucursal(postUrl){
    let postObj = { 
        id: +document.getElementById("id").value,
        nombreSucursal: document.getElementById("nombreSucursal").value, 
        direccion: document.getElementById("direccion").value, 
        telefono: +document.getElementById("telefono").value
    }
    let post = JSON.stringify(postObj)
    const url = postUrl
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(post);
    xhr.onload = function () {
        if(xhr.status === 201) {
            console.log("Post successfully created!") 
        }
    }
    clearSucursalInputs();
}
function clearSucursalInputs(){
    document.getElementById("id").value = ""
    document.getElementById("nombreSucursal").value = ""
    document.getElementById("direccion").value = ""
    document.getElementById("telefono").value = ""
}

function addVehiculo(){
    let postObj = { 
        placa: document.getElementById("placa").value, 
        marca: document.getElementById("marca").value, 
        linea: document.getElementById("linea").value,
        modelo: +document.getElementById("modelo").value, 
        kilometraje: +document.getElementById("kilometraje").value
    }
    let post = JSON.stringify(postObj)
    const url = "addVehiculo"
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(post);
    xhr.onload = function () {
        if(xhr.status === 201) {
            console.log("Post successfully created!") 
        }
    }
    clearVehiculoInputs();
}
function postVehiculo(postUrl){
    let postObj = { 
        id: +document.getElementById("id").value,
        placa: document.getElementById("placa").value, 
        marca: document.getElementById("marca").value, 
        linea: document.getElementById("linea").value,
        modelo: +document.getElementById("modelo").value, 
        kilometraje: +document.getElementById("kilometraje").value
    }
    let post = JSON.stringify(postObj)
    const url = postUrl
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(post);
    xhr.onload = function () {
        if(xhr.status === 201) {
            console.log("Post successfully created!") 
        }
    }
    clearVehiculoInputs();
}
function clearVehiculoInputs(){
    document.getElementById("id").value = ""
    document.getElementById("placa").value = ""
    document.getElementById("marca").value = ""
    document.getElementById("linea").value = ""
    document.getElementById("modelo").value = ""
    document.getElementById("kilometraje").value = ""
}