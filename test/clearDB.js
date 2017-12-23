const fs = require('fs');
var cassandra = require('cassandra-driver');
var async = require('async');
var system_schema = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'system_schema'});
var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'test'});

system_schema.execute("select * from columns where keyspace_name = 'test';", function (err, result) {
    var rows = result.rows;
    var tables = {};
    for(var row in rows){
        var name = rows[row].table_name;
        if(tables[name] == undefined){
            tables[name] = '';
        }
    }
    tables = Object.keys(tables);
    var count = 0;
    for(var table in tables){
        table = tables[table];
        console.log('Droped TABLE : ' + table);
        client.execute("drop table "+table+";").then(function(err,result){
            count++;
            if(count == tables.length){
                console.log('done');
            }
        });
    }
});