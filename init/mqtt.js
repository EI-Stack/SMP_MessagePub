"use strict";
const config = require('../config');                         // Load the config
const async = require('async');                             // Async Library
const express = require('express');                           // Express
const router = express.Router();
const _ = require('underscore');                        // Underscore Library
const app = require('../app');
const jwt_decode = require('jwt-decode');
const mqtt = app.mqtt;
const mqttsub = app.mqttsub;
// MQTT 
var countMirdc = 0;
let countBySub = 0;

// mqtt.on("connect", function () { 
mqtt.on("connect", function () {
    console.log("[MQTT]:", "Connected.");
    let count = 0;
    let topic = process.env.topic || config.topic;
    let options = {
        qos: 0
    };

    let duration = 1000;
    let timer_id = setInterval(function () {
        let BaseData = '{"hello":"world"}';
        publish(topic, BaseData, options);
    }, duration);

    // mqtt.subscribe(topic);
    function publish(topic, msg, options) {
        if (mqtt.connected && count <= 100000) {
            mqtt.publish(topic, msg, options, function (err) {
                if (!err) {
                    console.log(count++);
                } else {
                    console.error(count++);
                }
            });
        }
    };
});



mqtt.on("message", function (topic, data) {
    // console.log(JSON.parse(data.toString()));
});
mqtt.on("close", function () {
    console.error("[MQTT]: Disconnected.");
});
mqtt.on("reconnect", function () {
    console.error("[MQTT]: Reconnect.");
});
mqtt.on("error", function (err) {
    console.error("[MQTT]:" + err.stack);
});

module.exports = router;