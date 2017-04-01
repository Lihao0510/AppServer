/**
 * Created by lihao on 2017/2/1.
 */
var express = require('express');
var router = express.Router();
var config = require('config-lite')
var dao = require('../dao/newsdao')
var checklogin = require('../utils/loginchecker').checkLogin

router.get('/', checklogin, function (req, res, next) {
    dao.queryAll('param', function (result) {
        if (result.status) {
            return res.render('news', {
                    data: result.data,
                    user: req.session.user
                }
            )
        } else {
            next()
        }
    })
})

router.get('/list/:page', function (req, res, next) {
    let curPage = req.params.page
    dao.queryByPage(curPage).then(function (result) {
        return res.send({
            status: 1,
            data: JSON.parse(JSON.stringify(result))
        })
    }).catch(function (err) {
        return res.send({
            status: 0,
            error: err.toString()
        })
    })
})

router.post('/add', checklogin, function (req, res, next) {
    dao.add(req.body, function (result) {
        if (result.status) {
            console.log('数据库插入成功!')
            return res.send({
                status: 1,
                data: result.info
            })
        } else {
            return res.send({
                status: 0,
                err: '数据插入失败!'
            })
        }
    })
})

module.exports = router