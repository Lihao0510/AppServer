/**
 * Created by lihao on 2017/2/3.
 */

var sql = require('../mapper/funnymapper');
var pool = require('./mysqlPool');
var moment = require('moment');
var config = require('config-lite');
var pageSize = config.pageconf.pageSize;

module.exports = {
    add: function (param) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                }
                let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                console.log(date)
                connection.query(sql.insert, [param.title, param.url, param.img, date], function (err, result) {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                })
                connection.release()
            })
        })
    },
    queryAll: function (num) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                }
                connection.query(sql.queryAll, function (err, rows, fields) {
                    if (err) {
                        reject(err)
                    } else if (rows.length) {
                        let length = rows.length > num ? num : rows.length
                        let arr = []
                        for (let i = 0; i < length; i++) {
                            let obj = {
                                id: rows[i].id,
                                title: rows[i].title,
                                url: rows[i].url,
                                pic: rows[i].img,
                                time: rows[i].time
                            }
                            arr.push(obj)
                        }
                        resolve(arr)
                    } else {
                        reject(new Error('数据库未知错误!'))
                    }
                })
                connection.release()
            })
        })
    },
    query: function (page) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                }
                connection.query(sql.queryByPage, [(page - 1) * pageSize, pageSize], function (err, rows, fields) {
                    console.log("当前页:" + page + "分页参数:" + pageSize + "查询范围:" + (page - 1) * pageSize + "-" + pageSize)
                    if (err) {
                        reject(err)
                    } else if (rows.length) {
                        let length = rows.length
                        let arr = []
                        for (let i = 0; i < length; i++) {
                            let obj = {
                                id: rows[i].id,
                                title: rows[i].title,
                                url: rows[i].url,
                                pic: rows[i].img,
                                time: rows[i].time
                            }
                            arr.push(obj)
                        }
                        console.log(arr.toString())
                        resolve(arr)
                    } else {
                        reject(new Error('数据库未知错误!'))
                    }
                })
                connection.release()
            })
        })
    }
}