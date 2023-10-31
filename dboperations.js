var  config = require('./dbconfig');
const  sql = require('mssql');
var currentUser;

async function setCurrentUser(user){
  currentUser = user.usuario;
}

async  function  getLogin(user, pass) {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request()
    .input('user', sql.VarChar, user)
    .input('pass', sql.VarChar, pass)
    .query("Execute dbo.checkLogin @user, @pass");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function getPilotos() {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request().query("Select * From dataPilotos");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
async  function  addPiloto(piloto) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('DPI', sql.VarChar, piloto.dpi)
    .input('NIT', sql.Int, piloto.nit)
    .input('nombre', sql.VarChar, piloto.nombre)
    .input('apellido', sql.VarChar, piloto.apellido)
    .input('telefono', sql.Int, piloto.telefono)
    .query('INSERT INTO pilotos(dpi, nit, nombre, apellido, telefono) values(@DPI, @NIT, @nombre, @apellido, @telefono)');
    return  insertProduct.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}
async  function  editPiloto(piloto) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('id', sql.Int, piloto.id)
    .input('dpi', sql.VarChar, piloto.dpi)
    .input('nit', sql.Int, piloto.nit)
    .input('nombre', sql.VarChar, piloto.nombre)
    .input('apellido', sql.VarChar, piloto.apellido)
    .input('telefono', sql.Int, piloto.telefono)
    .execute('updatePiloto');
    return  insertProduct.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}
async  function  deletePiloto(piloto) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('id', sql.Int, piloto.id)
    .query('DELETE FROM pilotos WHERE id = @id');
    return  insertProduct.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}

async function getSucursales() {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request().query("Select * From dataSucursales");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
async  function  addSucursal(sucursal) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('nombreSucursal', sql.VarChar, sucursal.nombreSucursal)
    .input('direccion', sql.VarChar, sucursal.direccion)
    .input('telefono', sql.Int, sucursal.telefono)
    .query('INSERT INTO sucursales(nombreSucursal, direccion, telefono) values(@nombreSucursal, @direccion, @telefono)');
    return  insertProduct.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}
async  function  editSucursal(sucursal) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('id', sql.Int, sucursal.id)
    .input('nombreSucursal', sql.VarChar, sucursal.nombreSucursal)
    .input('direccion', sql.VarChar, sucursal.direccion)
    .input('telefono', sql.Int, sucursal.telefono)
    .execute('updateSucursal');
    return  insertProduct.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}
async  function  deleteSucursal(sucursal) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('id', sql.Int, sucursal.id)
    .query('DELETE FROM sucursales WHERE id = @id');
    return  insertProduct.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}

async function getVehiculos() {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request().query("Select * From dataVehiculos");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
async  function  addVehiculo(vehiculo) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('placa', sql.VarChar, vehiculo.placa)
    .input('marca', sql.VarChar, vehiculo.marca)
    .input('linea', sql.VarChar, vehiculo.linea)
    .input('modelo', sql.Int, vehiculo.modelo)
    .input('kilometraje', sql.Int, vehiculo.kilometraje)
    .query('INSERT INTO vehiculos(placa, marca, linea, modelo, kilometraje) values(@placa, @marca, @linea, @modelo, @kilometraje)');
    return  insertProduct.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}
async  function  editVehiculo(vehiculo) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('id', sql.Int, vehiculo.id)
    .input('placa', sql.VarChar, vehiculo.placa)
    .input('marca', sql.VarChar, vehiculo.marca)
    .input('linea', sql.VarChar, vehiculo.linea)
    .input('modelo', sql.Int, vehiculo.modelo)
    .input('kilometraje', sql.Int, vehiculo.kilometraje)
    .execute('updateVehiculo');
    return  insertProduct.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}
async  function  deleteVehiculo(vehiculo) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('id', sql.Int, vehiculo.id)
    .query('DELETE FROM vehiculos WHERE id = @id');
    return  insertProduct.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}

async function getRutas() {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request().query("Select * From dataRutas");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
async function getRutaPilotos() {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request().query("Select * From rutaPilotos");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
async function getRutaVehiculos() {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request().query("Select * From rutaVehiculos");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
async function getRutaSucursales() {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request().query("Select * From rutaSucursales");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
async function getRutaID() {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request().query("Select id From rutas");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
async  function  addRuta(ruta) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('piloto', sql.VarChar, ruta.piloto)
    .input('vehiculo', sql.VarChar, ruta.vehiculo)
    .input('origen', sql.VarChar, ruta.origen)
    .input('destino', sql.VarChar, ruta.destino)
    .input('km', sql.Int, ruta.km)
    .execute('newRuta');
    return  insertProduct.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}
async  function  editRuta(ruta) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('id', sql.Int, ruta.id)
    .input('piloto', sql.VarChar, ruta.piloto)
    .input('vehiculo', sql.VarChar, ruta.vehiculo)
    .input('origen', sql.VarChar, ruta.origen)
    .input('destino', sql.VarChar, ruta.destino)
    .input('km', sql.Int, ruta.km)
    .execute('updateRuta');
    return  insertProduct.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}
async  function  deleteRuta(ruta) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('id', sql.Int, ruta.id)
    .query('DELETE FROM rutas WHERE id = @id');
    return  insertProduct.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}

async  function  getAddress(nombre) {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request()
    .input('nombreSucursal', sql.VarChar, nombre)
    .execute("getAddress");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
async  function  checkRole(user) {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request()
    .input('usuario', sql.VarChar, user)
    .execute("getRole");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
async  function  getCurrentRole() {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request()
    .input('usuario', sql.VarChar, currentUser)
    .execute("getRole");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
async  function  getLatestRuta() {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request()
    .input('usuario', sql.VarChar, currentUser)
    .execute("getLatestRuta");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function getPilotoRutas() {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request().query("Select * From pilotosRutas");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
async function getVehiculoRutas() {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request().query("Select * From vehiculosRutas");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = {
  getLogin:  getLogin,
  getSucursales: getSucursales,
  addSucursal:  addSucursal,
  editSucursal: editSucursal,
  deleteSucursal: deleteSucursal,
  getPilotos: getPilotos,
  addPiloto:  addPiloto,
  editPiloto: editPiloto,
  deletePiloto: deletePiloto,
  getVehiculos: getVehiculos,
  addVehiculo:  addVehiculo,
  editVehiculo: editVehiculo,
  deleteVehiculo: deleteVehiculo,
  getRutas: getRutas,
  getRutaPilotos: getRutaPilotos,
  getRutaVehiculos: getRutaVehiculos,
  getRutaSucursales: getRutaSucursales,
  getRutaID: getRutaID,
  addRuta: addRuta,
  editRuta: editRuta,
  deleteRuta: deleteRuta,
  getAddress: getAddress,
  checkRole: checkRole,
  getLatestRuta: getLatestRuta,
  setCurrentUser: setCurrentUser,
  getVehiculoRutas: getVehiculoRutas,
  getPilotoRutas: getPilotoRutas,
  getCurrentRole: getCurrentRole
}