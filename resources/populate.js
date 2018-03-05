const mysql = require('mysql');
const policies = require('./580891a4100000e8242b75c5.json');
const clients = require('./5808862710000087232b75ac.json');
const config = require('../config.js');

function handler_error(err){
	if (err) {
		console.error('error connecting: ' + err.stack);
	    throw err;
	}
}

function make_values(resource, name){
	var queues = [];
	var resources = resource[name];
	for (var i = 0; i< resources.length;i++){
		var item = resources[i];
		var values;
		if (name == 'clients'){
			values = [ item['id'], item['name'], item['email'], item['role'] ];
		} else if (name == 'policies'){
			values = [ item['id'], item['amountInsured'], item['email'], item['inceptionDate'], item['installmentPayment'], item['clientId'] ]
		}
		queues.push(values)
	}
	return queues;
}

function insert_values(conn, query, values){
	conn.query(query, [values], function(err){
		if (handler_error(err)){
			conn.end();
		}
	});
}

(function(){

	var conn = mysql.createConnection({
	  host: config.mysql.host,
	  user: config.mysql.user,
	  password: config.mysql.password,
	  database: config.mysql.database
	});

	var query_clients = 'INSERT into clients (id, name, email, role) values ?';
	var values_clients = make_values(clients, 'clients')

	var query_policies = 'INSERT into policies (id, amountInsured, email, inceptionDate, installmentPayment, clients_id) values ?';
	var values_policies = make_values(policies, 'policies')

	conn.connect(function(err) {
		handler_error(err)
		console.log('connected as id ' + conn.threadId);
	});

	try {
		insert_values(conn, query_clients, values_clients);
		insert_values(conn, query_policies, values_policies);
	} catch(err){
		handler_error(err);
	} finally {
		conn.end();
	}

})();
