'use strict';

//var party = require('./screenparty');  // offload some logic to this class
var app = require('express')();
var express = require('express');
var server = require('http').Server(app);

server.listen(80);
app.use('/', express.static('html/'));

console.log("listening on localhost:80");
