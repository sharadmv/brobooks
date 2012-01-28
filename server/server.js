var express = require('express');
var app = express.createServer();
app.use(express.static('../static'));
app.get('/', function(req, res){
  res.send('Hello World');
});
app.listen(3000);
