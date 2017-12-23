var BSON = require('test/bson');
var Long = BSON.Long;
var bson = new BSON();
const fs = require('fs');

/*fs.readFile('./byte/accesspoint.bson', function (err, data) {
    var json = bson.deserialize(data);
    console.log(Object.keys(json));
});*/
fs.readFile('./byte/wifi_radio_stats.bson', function (err, data) {
    var json = bson.deserialize(data);
    console.log(Object.keys(json));
});/*
fs.readFile('./byte/wifi_device_stats.bson', function (err, data) {
    var json = bson.deserialize(data);
    console.log(json);
});*/
//var data = bson.deserialize(data);