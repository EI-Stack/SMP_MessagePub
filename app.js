"use strict";
const $ 		        = require('jquery');
const config            = require('./config');
const mqtt              = require('mqtt');
const options           = { 'port'     : config.mqtt.port,
                            'host'     : config.mqtt.broker,
                            'username' : config.mqtt.username, 
                            'password' : config.mqtt.password,
                            'qos'      : 0 };
exports.mqtt            = mqtt.connect(config.mqtt.broker, options);

const mqtt_sub              = require('mqtt');
const options_sub           = { 'port'     : "1883",
                            'host'     : "mqtt://rmq-fsc.eastasia.cloudapp.azure.com" ,
                            'username' : "admin", 
                            'password' : "good4admin",
                            'qos'      : 0 };
exports.mqttsub            = mqtt_sub.connect("mqtt://rmq-fsc.eastasia.cloudapp.azure.com", options_sub);


// MQTT initial
if (config.service.mqtt.toString() === 'true') { require('./init/mqtt'); }

const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const routes       = require('./routes/index');
const app          = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, Tenant');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// RESTful APIs
app.use('/'         , routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {    
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
