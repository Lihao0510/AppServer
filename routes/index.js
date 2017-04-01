var express = require('express');
var router = express.Router();
var checklogin = require('../utils/loginchecker').checkLogin

/* GET home page. */
router.get('/', checklogin, function (req, res, next) {

    let username = req.session.user

    return res.render('index', {
        user: username
    })

});

module.exports = router;
