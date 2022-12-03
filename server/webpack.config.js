const path = require('path');

module.exports = {
  entry: './dist/index.js',
  target: "node",
  /* 
  functions-framework library will be provided by Cloud Functions runtime
  so we should not include it
   */ 
  externals: ({_, request}, callback) => {
    if (request === "@google-cloud/functions-framework") {
      return callback(null, "commonjs " + request);
    }
    callback();
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'cloud'),
  },
};