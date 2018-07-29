const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

app.use(morgan('combined'));

const PORT = process.env.PORT || 8080;

app.use(forceSSL());
app.use(express.static(__dirname + '/dist'));


// for path relocation strategy angular
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});


app.listen(PORT, error => {
  if (error) {
    return console.error('[x] server.js ::', error);
  }
  console.log('[v] server.js :: listening on port', PORT);
});


function forceSSL() {
  return (req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  };
}
