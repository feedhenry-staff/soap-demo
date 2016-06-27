var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var cacheManager = require('./cacheManager.js');

function categoriesRoute() {
  var categories = new express.Router();
  categories.use(cors());
  categories.use(bodyParser());


  // GET REST endpoint - query params may or may not be populated
  categories.get('/', function(req, res) {
    cacheManager.getCategories(function(err, cachedCategories){
      if (err){
        res.json({err: err});
      } else 
      {
        res.json(cachedCategories);
      }
    })
  });



  return categories;
}

module.exports = categoriesRoute;
