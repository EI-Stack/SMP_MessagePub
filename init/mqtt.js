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
    //單位為毫秒
    let duration = 1000;

    let timer_id = setInterval(function () {
        let BaseData = "";
        var randomVarUsername = Math.floor(Math.random() * 6);
        switch (randomVarUsername) {
            case 0:
                BaseData = BaseData + '{"userId":"f6e98537-18b7-4c7b-8581-111111111111"';
                BaseData = BaseData + ',"username":"smp-test-1@iii.org.tw"';
                break;
            case 1:
                BaseData = BaseData + '{"userId":"f6e98537-18b7-4c7b-8581-222222222222"';
                BaseData = BaseData + ',"username":"smp-test-2@iii.org.tw"';
                break;
            case 2:
                BaseData = BaseData + '{"userId":"f6e98537-18b7-4c7b-8581-333333333333"';
                BaseData = BaseData + ',"username":"smp-test-3@iii.org.tw"';
                break;
            case 3:
                BaseData = BaseData + '{"userId":"f6e98537-18b7-4c7b-8581-444444444444"';
                BaseData = BaseData + ',"username":"smp-test-4@iii.org.tw"';
                break;
            case 4:
                BaseData = BaseData + '{"userId":"f6e98537-18b7-4c7b-8581-555555555555"';
                BaseData = BaseData + ',"username":"smp-test-5@iii.org.tw"';
                break;
            case 5:
                BaseData = BaseData + '{"userId":"f6e98537-18b7-4c7b-8581-666666666666"';
                BaseData = BaseData + ',"username":"smp-test-6@iii.org.tw"';
                break;
        }

        var randomVarDeviceName = Math.floor(Math.random() * 6);
        switch (randomVarDeviceName) {
            case 0:
                BaseData = BaseData +
                    ',"deviceName":"device1"' +
                    ',"deviceId":"1"';
                break;
            case 1:
                BaseData = BaseData +
                    ',"deviceName":"device2"' +
                    ',"deviceId":"2"';
                break;
            case 2:
                BaseData = BaseData +
                    ',"deviceName":"device3"' +
                    ',"deviceId":"3"';
                break;
            case 3:
                BaseData = BaseData +
                    ',"deviceName":"device4"' +
                    ',"deviceId":"4"';
                break;
            case 4:
                BaseData = BaseData +
                    ',"deviceName":"device5"' +
                    ',"deviceId":"5"';
                break;
            case 5:
                BaseData = BaseData +
                    ',"deviceName":"device6"' +
                    ',"deviceId":"6"';
                break;
        }
        var randomVarAppName = Math.floor(Math.random() * 8);
        switch (randomVarAppName) {
            case 0:
                BaseData = BaseData + ',"AppName":"Collision Detection Software"';
                BaseData = BaseData + ',"AppId":"1679091c5a880faf6fb5e6087eb1b2dc"';
                break;
            case 1:
                BaseData = BaseData + ',"AppName":"iCAM"';
                BaseData = BaseData + ',"AppId":"8f14e45fceea167a5a36dedd4bea2543"';
                break;
            case 2:
                BaseData = BaseData + ',"AppName":"Singal Acquisition"';
                BaseData = BaseData + ',"AppId":"c9f0f895fb98ab9159f51fd0297e236d"';
                break;
            case 3:
                BaseData = BaseData + ',"AppName":"Automated Data Collection"';
                BaseData = BaseData + ',"AppId":"45c48cce2e2d7fbdea1afc51c7c6ad26"';
                break;
            case 4:
                BaseData = BaseData + ',"AppName":"Suppress Warpage Optimization"';
                BaseData = BaseData + ',"AppId":"d3d9446802a44259755d38e6d163e820"';
                break;
            case 5:
                BaseData = BaseData + ',"AppName":"OPCUA"';
                BaseData = BaseData + ',"AppId":"6512bd43d9caa6e02c990b0a82652dca"';
                break;
            case 6:
                BaseData = BaseData + ',"AppName":"ADS"';
                BaseData = BaseData + ',"AppId":"c20ad4d76fe97759aa27a0c99bff6710"';
                break;
            case 7:
                BaseData = BaseData + ',"AppName":"Milling Path Analysis"';
                BaseData = BaseData + ',"AppId":"c51ce410c124a10e0db5e4b97fc2af39"';
                break;
        }
        var randomVarCharge = Math.floor(Math.random() * 3);
        switch (randomVarCharge) {
            case 0:
                let CountData = BaseData +
                    ',"Type":"count"' +
                    ',"CountName":"APInumber"';
                var randomVar = Math.floor(Math.random() * 5) + 1;
                CountData = CountData + ',"Count":"' + randomVar + '"}';
                publish(topic, CountData, options);
                break;
            case 1:
                let SubscriptionData = BaseData +
                    ',"Type":"subscription"';
                var randomYear = Math.floor(Math.random() * 4) + 2019;
                var randomMonth = Math.floor(Math.random() * 12) + 1;
                SubscriptionData = SubscriptionData + ',"year":"' + randomYear + '"';
                SubscriptionData = SubscriptionData + ',"month":"' + randomMonth + '"}';
                publish(topic, SubscriptionData, options);
                break;
            case 2:
                let AccumulationTimeData = BaseData +
                    ',"Type":"time"';
                var randomVar = (Math.floor(Math.random() * 5)) * 3600;
                AccumulationTimeData = AccumulationTimeData + ',"Time":"' + randomVar + '"}';
                publish(topic, AccumulationTimeData, options);
                break;
        }


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