var cassandra = require('cassandra-driver');
var async = require('async');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'test'});
client.execute("SELECT * FROM emp", function (err, result) {
    if (!err){
        if ( result.rows.length > 0 ) {
            var user = result.rows[0];
            console.log(user);
        } else {
            console.log("No results");
            client.execute("INSERT INTO emp (emp_id, emp_name, emp_city,emp_phone, emp_sal) VALUES(1,'ram', 'Hyderabad', 9848022338, 50000);",function() {

            });
        }
    }else{
        client.execute("CREATE TABLE emp( emp_id int PRIMARY KEY, emp_name text, emp_city text, emp_sal varint, emp_phone varint);",function() {

        });
    }
});
