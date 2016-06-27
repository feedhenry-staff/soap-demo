'use strict';

var async = require('async'),
    soap = require('soap'),
    path = require('path'),
    https = require('http');
var services = module.exports,
host = path.resolve(__dirname, './../wsdl/');

function init(cb) {

    var wsdlPath = 'http://localhost:8001/ws/DataManager?wsdl';

    soap.createClient(wsdlPath, function(err, client) {


        services.client = client;
        if (err){
            cb(err);    
        } else {
            cb(null, client)
        }
        
    });
}


/**
 * Initiate remote soap web services
 */
exports.init = function(cb){
    init(function(err, response) {
        if(err) {
            cb(err, null);

        } else {
            cb(null, response )
        }
        
    }); 
}

