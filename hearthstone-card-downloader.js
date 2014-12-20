#!/usr/local/bin/node

var fs      = require('fs');
var request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

request.get('https://raw.githubusercontent.com/pdyck/hearthstone-db/master/cards/all-cards.json', function(err, res, body) {
  console.log("Downloading Hearthstone meta-data from github/pdyck/hearthstone-db");
  var cardData = JSON.parse(body);
  cardData.cards.forEach(function(card) {
    var urlSegments = card.image_url.split("/");
    var imageName   = [card.hero, card.name].join(" ").trim().replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase().replace(":", "_") + ".png";
    download(card.image_url, imageName, function(){ console.log("done downloading", card.name, "saved to", imageName);});
  });
});
