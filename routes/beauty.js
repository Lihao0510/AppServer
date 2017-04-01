/**
 * Created by lihao on 2017/2/3.
 */
var express = require('express');
var router = express.Router();
var config = require('config-lite')
var checklogin = require('../utils/loginchecker').checkLogin

router.get('/', checklogin, function (req, res, next) {
    res.render('beauty', {
        data: '',
        user: req.session.user
    })
})

module.exports = router