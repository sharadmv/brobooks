var express = require('express');
var app = express.createServer();
var port = 8080;
app.use(express.static('../static'));
app.listen(port);
console.log("Server listening on port "+port);
