var express = require('express');
var mbaasApi = require('fh-mbaas-api');
var mbaasExpress = mbaasApi.mbaasExpress();


var localServices = require("./lib/localServices");




// Securable endpoints: list the endpoints which you want to make securable here
var securableEndpoints = [];

var app = express();

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaasExpress.sys(securableEndpoints));
app.use('/mbaas', mbaasExpress.mbaas);




// Note: important that this is added just before your own Routes
app.use(mbaasExpress.fhmiddleware());


app.use(express.static(__dirname + '/public'));

var port = process.env.FH_PORT || process.env.VCAP_APP_PORT || 8001;
var server = app.listen(port, function(){
  	console.log("App started at: " + new Date() + " on port: " + port);
  	localServices.init(server, function(err) {
    	if (err) {
	    	console.log('Error initializing local soap services');
	    	console.log(err);
	    	return;
    	}
    	console.log("Local Soap Services initialised successfully");
  	});
});

// Important that this is last!
app.use(mbaasExpress.errorHandler());