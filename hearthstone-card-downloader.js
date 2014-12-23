#!/usr/local/bin/node

var fs      = require('fs');
var request = require('request');
var metaData = {cards:[]};
var cardData = require('./cards.js');

var saneImageName = function(hero, cardName) {
  return [hero, cardName].join(" ").trim().replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase().replace(":", "_") + ".png";
};

var schemaParser = function(c) {
  c.image_url = "/img/cards/" + saneImageName(c.hero, c.name);
  return c;
};

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

cardData.cards.forEach(function(card) {
  var urlSegments = card.image_url.split("/");
  var imageName   = saneImageName(card.hero, card.name);
  // var newSchema = schemaParser(card);
  // metaData.cards.push(newSchema);
  download(card.image_url, imageName, function(){
    console.log("done downloading", card.name, "saved to", imageName);
  });
});


// fs.writeFile('new-schema.json', JSON.stringify(metaData));


