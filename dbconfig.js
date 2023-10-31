

const  config = {
  user:  'Alex', // sql user
  password:  '1234', //sql user password
  server: 'localhost', 
  database: 'FTruckProd',
  port:1433,
  options:{
    enableArithAbort: true,
    encrypt:true,
    trustedConnection: true,
    trustServerCertificate: true,
  },
}

module.exports = config;