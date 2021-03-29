const config  = require('../config');
const express = require('express');
const router  = express.Router();

// GET home page.
router.get('/', function(req, res, next) {    
    res.render('index', {
        title   : 'Message-Pub',
        version : config.version
    });
});

module.exports = router;
