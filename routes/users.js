var express = require('express');
var router = express.Router();
var config = require('config-lite')
var dao = require('../dao/userdao')
var checknologin = require('../utils/loginchecker').checkNotLogin
var checklogin = require('../utils/loginchecker').checkLogin

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('login')
    return
});

router.get('/register', checknologin, function (req, res, next) {
    return res.render('register')
})

router.get('/login', checknologin, function (req, res, next) {
    return res.render('login')
})

router.post('/login', function (req, res, next) {
    dao.query(req.body, function (data) {
        if (data.status) {
            req.session.user = req.body.username
            req.session.login = true
            return res.send({
                status: 1
            })
        } else {
            return res.send({
                status: 0,
                info: '用户名或密码错误!'
            })
        }
    })
})

router.post('/register', function (req, res, next) {

    dao.add(req.body, function (data) {
        if (data.status) {
            return res.send({
                status: 1
            })
        } else {
            return res.send({
                status: 0
            })
        }
    })
})

router.get('/manager', checklogin, function (req, res, next) {
    console.log('接收到请求!')
    dao.queryAll('user', function (result) {
        if (result.status) {
            return res.render('user', {
                    data: result.data,
                    user: req.session.user
                }
            )
        } else {
            next()
        }
    })
})

router.get('/quit', checklogin, function (req, res, next) {
    req.session.login = false
    res.redirect('/users/login')
})

module.exports = router;
