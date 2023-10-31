var  Db = require('./dboperations');
var  Order = require('./login');
var  express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');
var  app = express();
var  router = express.Router();

app.use('/styles', express.static(__dirname + '/public/styles'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/public', router);

router.use((request, response, next) => {
  console.log('middleware');
  next();
});

router.route('/setCurrentUser').post((request, response) => {
  let  user = { ...request.body }
  Db.setCurrentUser(user).then(data  => {
    response.status(201).json(data);
  })
})
 
router.route('/loginCheck/:user/:pass').get((request, response) => {
  Db.getLogin(request.params.user, request.params.pass).then((data) => {
    response.json(data[0]);
  })
})

router.route('/getPilotos').get((request, response) => {
  Db.getPilotos().then((data) => {
    response.json(data[0]);
  })
})
router.route('/addPiloto').post((request, response) => {
  let  piloto = { ...request.body }
  Db.addPiloto(piloto).then(data  => {
    response.status(201).json(data);
  })
})
router.route('/editPiloto').post((request, response) => {
  let  piloto = { ...request.body }
  Db.editPiloto(piloto).then(data  => {
    response.status(201).json(data);
  })
})
router.route('/deletePiloto').post((request, response) => {
  let  piloto = { ...request.body }
  Db.deletePiloto(piloto).then(data  => {
    response.status(201).json(data);
  })
})

router.route('/getSucursales').get((request, response) => {
  Db.getSucursales().then((data) => {
    response.json(data[0]);
  })
})
router.route('/addSucursal').post((request, response) => {
  let  sucursal = { ...request.body }
  Db.addSucursal(sucursal).then(data  => {
    response.status(201).json(data);
  })
})
router.route('/editSucursal').post((request, response) => {
  let  sucursal = { ...request.body }
  Db.editSucursal(sucursal).then(data  => {
    response.status(201).json(data);
  })
})
router.route('/deleteSucursal').post((request, response) => {
  let  sucursal = { ...request.body }
  Db.deleteSucursal(sucursal).then(data  => {
    response.status(201).json(data);
  })
})

router.route('/getVehiculos').get((request, response) => {
  Db.getVehiculos().then((data) => {
    response.json(data[0]);
  })
})
router.route('/addVehiculo').post((request, response) => {
  let  vehiculo = { ...request.body }
  Db.addVehiculo(vehiculo).then(data  => {
    response.status(201).json(data);
  })
})
router.route('/editVehiculo').post((request, response) => {
  let  vehiculo = { ...request.body } 
  Db.editVehiculo(vehiculo).then(data  => {
    response.status(201).json(data);
  })
})
router.route('/deleteVehiculo').post((request, response) => {
  let  vehiculo = { ...request.body }
  Db.deleteVehiculo(vehiculo).then(data  => {
    response.status(201).json(data);
  })
})

router.route('/getRutas').get((request, response) => {
  Db.getRutas().then((data) => {
    response.json(data[0]);
  })
})
router.route('/getRutaPilotos').get((request, response) => {
  Db.getRutaPilotos().then((data) => {
    response.json(data[0]);
  })
})
router.route('/getRutaVehiculos').get((request, response) => {
  Db.getRutaVehiculos().then((data) => {
    response.json(data[0]);
  }) 
}) 
router.route('/getRutaSucursales').get((request, response) => {
  Db.getRutaSucursales().then((data) => {
    response.json(data[0]);
  })
})
router.route('/getRutaID').get((request, response) => {
  Db.getRutaID().then((data) => {
    response.json(data[0]);
  })
}) 
router.route('/addRuta').post((request, response) => {
  let  ruta = { ...request.body }
  Db.addRuta(ruta).then(data  => {
    response.status(201).json(data);
  })
})
router.route('/editRuta').post((request, response) => {
  let  ruta = { ...request.body }
  Db.editRuta(ruta).then(data  => {
    response.status(201).json(data);
  })
})
router.route('/deleteRuta').post((request, response) => {
  let  ruta = { ...request.body }
  Db.deleteRuta(ruta).then(data  => {
    response.status(201).json(data);
  })
})

router.route('/getAddress/:nombre').get((request, response) => {
  Db.getAddress(request.params.nombre).then((data) => {
    response.json(data[0]);
  })
})
router.route('/checkRole/:user').get((request, response) => {
  Db.checkRole(request.params.user).then((data) => {
    response.json(data[0]);
  })
})   
router.route('/getCurrentRole').get((request, response) => {
  Db.getCurrentRole().then((data) => {
    response.json(data[0]);
  })
}) 
router.route('/getLatestRuta').get((request, response) => {
  Db.getLatestRuta().then((data) => {
    response.json(data[0]);
  })
})

router.route('/getPilotoRutas').get((request, response) => {
  Db.getPilotoRutas().then((data) => {
    response.json(data[0]);
  })
})
router.route('/getVehiculoRutas').get((request, response) => {
  Db.getVehiculoRutas().then((data) => {
    response.json(data[0]);
  })
})

  
var  port = process.env.PORT || 5501; 
app.listen(port, 'localhost');
console.log('SQL API is runnning at ' + port); 