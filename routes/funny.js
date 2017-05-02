/**
 * Created by lihao on 2017/2/3.
 */
var express = require('express');
var router = express.Router();
var config = require('config-lite')
var dao = require('../dao/funnydao')
var checklogin = require('../utils/loginchecker').checkLogin

router.get('/', checklogin, function (req, res, next) {
    console.log(req.cookies)
    dao.queryAll(50).then(function (result) {
        return res.render('funny', {
            user: req.session.user,
            data: JSON.parse(JSON.stringify(result))
        })
    }, function (err) {
        return res.render('error')
    })
})

router.get('/list', function (req, res, next) {

    dao.queryAll(50)
        .then(function (result) {
        return res.send({
            status: 1,
            data: JSON.parse(JSON.stringify(result))
        })
    }).catch(function (err) {
        console.log(err)
        return res.send({
            status: 0,
            err: err
        })
    })
})

router.get('/list/:page', function (req, res, next) {
    let curpage = req.params.page
    console.log('查询页:' + curpage)

    dao.query(curpage).then(function (result) {
        return res.send({
            status: 1,
            data: JSON.parse(JSON.stringify(result))
        })
    }).catch(function (err) {
        console.log(err)
        return res.send({
            status: 0,
            err: err
        })
    })
})

router.post('/add', checklogin, function (req, res, next) {
    dao.add(req.body).then(function (result) {
        console.log(result)
        return res.send({
            status: 1
        })
    }, function () {
        return res.send({
            status: 0
        })
    })
})

module.exports = router