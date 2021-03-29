"use strict";
const _ = require('underscore');
const config = {};
config.service = {};
config.mqtt = {};
config.influxdb = {};
config.mongodb = {};
config.restful = {};
let ensaas_services;

console.log("[ENSAAS_SERVICES]:" + process.env.ENSAAS_SERVICES);

if (!_.isUndefined(process.env.ENSAAS_SERVICES)) {
	ensaas_services = JSON.parse(process.env.ENSAAS_SERVICES);
	// Service
	config.version = process.env.VERSION;      		// Vesion
	config.port = process.env.PORT;				// Port
	config.topic = process.env.topic;
	config.ssourl = process.env.SSOURL;
	config.service.mqtt = process.env.SVC_MQTT;			// MQTT Service
	config.service.influxdb = process.env.SVC_INFLUXDB;		// Influxdb Service
	config.service.mongodb = process.env.SVC_MONGODB;		// MongoDB Service
	config.restful.verification = process.env.REST_VERIFY;        // Verify Tenant ID & Token
	config.restful.maxamount = process.env.REST_MAXAMOUNT;     // The maximum of amount.
	config.restful.defaultamount = process.env.REST_DEFAULTAMOUNT; // The default of amount.
	config.restful.order = process.env.REST_ORDER;
} else {
	config.version = "local";    // Vesion
	config.port = "8081";		// Port
	config.topic = "smp/metering/data";
	config.service.mqtt = true;		// MQTT Service
	config.restful.verification = false;      // Verify Tenant ID & Token
	config.restful.maxamount = 1000;     	// The maximum of amount.
	config.restful.defaultamount = 100; 		// The default of amount.
	config.restful.order = "DESC";
}
console.log("[config.service.mqtt]:" + config.service.mqtt);
console.log("[config.restful.verification]:" + config.restful.verification);
console.log("[config.restful.maxamount]:" + config.restful.maxamount);
console.log("[config.restful.defaultamount]:" + config.restful.defaultamount);
console.log("[config.restful.order]:" + config.restful.order);

// Server & MQTT & SCHEMA
if (config.service.mqtt.toString() === 'true') {
	if (!_.isUndefined(ensaas_services)) {
		if (!_.isUndefined(ensaas_services["p-rabbitmq"])) {
			let rmq_svc = ensaas_services["p-rabbitmq"][0];
			config.mqtt.broker = "mqtt://" + rmq_svc.credentials.externalHosts;
			config.mqtt.port = rmq_svc.credentials.protocols.mqtt.port;
			config.mqtt.username = rmq_svc.credentials.protocols.mqtt.username;
			config.mqtt.password = rmq_svc.credentials.protocols.mqtt.password;
			config.mqtt.qos = process.env.MQTT_QOS;
		} else {
			config.mqtt.broker = "mqtt://" + process.env.MQTT_HOST;
			config.mqtt.port = process.env.MQTT_PORT;
			config.mqtt.username = process.env.MQTT_USERNAME;
			config.mqtt.password = process.env.MQTT_PASSWORD;
			config.mqtt.qos = process.env.MQTT_QOS;
		}
	} else {
		config.mqtt.broker = "mqtt://192.168.50.187";     // string
		config.mqtt.port = 1883;     // integer  MQTT Broker Port (Default:1883) 
		config.mqtt.username = "admin";   // string   MQTT Username 
		config.mqtt.password = "good4admin";   // string   MQTT Password
		config.mqtt.retain = true;
	}
	console.log("[config.mqtt.host]:" + config.mqtt.broker);
	console.log("[config.mqtt.port]:" + config.mqtt.port);
	console.log("[config.mqtt.username]:" + config.mqtt.username);
	console.log("[config.mqtt.password]:" + config.mqtt.password);
	console.log("[config.mqtt.qos]:" + config.mqtt.qos);
}

module.exports = config;
