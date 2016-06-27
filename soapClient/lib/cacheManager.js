var mbaasApi = require('fh-mbaas-api');
var remoteServices = require('./remoteServices.js');

function init(cb){
	loadCache(cb);
}

function loadCache(cb){
	var data = [];
	remoteServices.client.getCategories({ }, 
		function(err, response) {
	        if (err) {
	        	cb(err, null)
	        } else {
	        	response.categories.category.forEach(function(category){
	        		data.push({
	        			catId: category.catId,
	        			catLabel: category.catLabel,
	        			type: category.type,
	        			longDescription: category.longDescription
	        		})
	        	});
	        	var options = {
				  "act": "save",
				  "key": "categories", // The key associated with the object
				  "value": JSON.stringify(data), // The value to be cached, must be serializable
				};
				mbaasApi.cache(options, function (err, res) {
				  if (err) {
				  	cb(err, null)
				  } else {
				  	cb(null, res)
				  }
				});
	        	

	        }
		}
	);
}

exports.getCategories = function(cb){
	var options = {
	  "act": "load",
	  "key": "categories" // key to look for in cache
	};
	mbaasApi.cache(options, function (err, res) {
	  if (err) {
	  	cb(err, null)
	  } else {
	  	cb(null, JSON.parse(res))
	  }
	});
}
exports.init = init;