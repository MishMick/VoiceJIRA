switch(process.env.NODE_ENV){
  case 'local':
    console.log("--LOCAL---");
    module.exports = require('./config/webpack.dev.js');
    break;
  case 'prod':
    console.log("--PROD--");
    module.exports = require('./config/webpack.prod.js');
    break;
}