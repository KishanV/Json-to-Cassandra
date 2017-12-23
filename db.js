const fs = require('fs');
var cassandra = require('cassandra-driver');
var async = require('async');
var keySpace = 'ziggo';
var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: keySpace});
var system_schema = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'system_schema'});
var dataTypes = cassandra.types.dataTypes;

function clearData() {
    system_schema.execute("select * from columns where keyspace_name = '"+keySpace+"';", function (err, result) {
        var rows = result.rows;
        var tables = {};
        var isEmpty = true;
        for (var row in rows) {
            var name = rows[row].table_name;
            isEmpty = false;
            if (tables[name] == undefined) {
                tables[name] = '';
            }
        }
        tables = Object.keys(tables);
        var count = 0;
        for (var table in tables) {
            table = tables[table];
            var delCQL = "drop table " + table + ";";
            console.log('Droped TABLE : ' + table + ' : ' + delCQL);
            client.execute(delCQL).then(function (err, result) {
                count++;
                if (count == tables.length) {
                    console.log('Database is Cleard.');
                    processJson();
                }
            });
        }
        if (isEmpty) {
            processJson();
        }
    });
}
new clearData();

function processJson() {
    fs.readFile('./database.json', function (err, data){
        var json = JSON.parse(data);
        for(level in json){
            var levelObj = json[level];
            for(table in levelObj){
                var tableObj = levelObj[table];
                var tableName = (level == '' ? '' : (level + '_')) + table;
                new processTable({
                    obj:tableObj,
                    name:tableName
                });
            }
        }
    });
}



function processTable(args){
    var selectTable = "SELECT * FROM " + args.name;
    var objFields = args.obj.fields;
    //console.log(objFields);
    client.execute(selectTable, function (err, result) {
        if(err != undefined){
            var primaryKey = args.obj.primaryKey;
            var createTable = 'CREATE TABLE '+args.name+'(';

            var fieldsList = [];
            for(var field in objFields){
                fieldsList.push(field + ' varchar');
            }
            createTable += fieldsList.join(', ');
            if(primaryKey != undefined){
                createTable += ', PRIMARY KEY('+primaryKey.join(', ') + ')';
            }
            createTable += ');';
            console.log("Created TABLE : " + args.name + ' : ' + createTable);
            //console.log(createTable);
            //console.log(createTable.columns);
            client.execute(createTable, function (err, result) {
                if(err){ console.log(err); }
            });
        }else{
            /*client.execute("Drop table " + args.name, function (err, result) {
                console.log("");
            });*/
            var collumns = result.columns;
            var existFields = [];
            //console.log(collumns);
            for (var name in collumns){
                new (function (collumns){
                    var collumn = collumns[name];
                    var alterTable = 'ALTER TABLE '+args.name+' DROP '+collumn.name;
                    existFields.push(collumn.name);
                    if(objFields[collumn.name] == undefined){
                        console.log('Field DROPED : ' + name);
                        client.execute(alterTable, function (err, result) {
                            if(err){ console.log('err'); }
                        });
                    }else{
                        var jsonDatatype = objFields[collumn.name].type;
                        var jsonCode = dataTypes.getByName(jsonDatatype).code;
                        delete objFields[collumn.name];
                        if(collumn.type.code != jsonCode){
                            console.log('Datatype is Changed : ' + collumn.name);
                            //var alterTable = 'ALTER TABLE '+args.name+' ALTER '+collumn.name+' TYPE '+jsonDatatype+';';
                            var addField =  'ALTER TABLE '+args.name+' ADD '+collumn.name+' '+jsonDatatype+';';
                            client.execute(alterTable, function (err, result) {
                                if(err){ console.log('err'); }
                                client.execute(addField, function (err, result) {
                                    if(err){ console.log('err'); }
                                });
                            });
                        }
                    }
                })(collumns);
            }
            for (var name in objFields){
                new (function () {
                    var collumn = objFields[name];
                    console.log('NEW Field ADDED : ' + name);
                    var newField =  'ALTER TABLE '+args.name+' ADD '+name+' '+collumn.type+';';
                    client.execute(newField, function (err, result) {
                        //console.log(newField);
                        if(err){ console.log('err'); }
                    });
                })();
            }
        }
    });
}