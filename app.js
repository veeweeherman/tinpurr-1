(function(){
  'use strict';
}());

var express = require('express');
var cat = require('./petfind').cat;
var avatar = require('./petfind').avatar;
var app = express();
var path = require('path');


var port = process.env.PORT || '3000';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.normalize(__dirname + '/')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/cats/:zip', function(req, res){

  cat.pet.getCats(req.params.zip, {'count':10},  function(data){
    var images = "";
    data.petfinder.pet.forEach(function(item){
      var av = avatar(item) || '/assets/mystery.png';
      images += '<img style="height:300px; width:300px; object-fit:cover;" id="' + item.id.$t + '" src="' + av + '">';
    });
    console.log(data.petfinder.pet);
    res.send(images);
  });
});

var server = app.listen(port, function() {
  var host = server.address().address;
  console.log('Tinpurr is listening at http://%s:%s -- %s', host, port);
});
