/**
 * Created by lihao on 2017/2/1.
 */

var sql = require('../mapper/newsmapper');
var pool = require('./mysqlPool');
var moment = require('moment');
var config = require('config-lite');
var pageSize = config.pageconf.pageSize;

module.exports = {
    add: function (param, callback) {
        pool.getConnection(function (err, connection) {
            let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            console.log(date)
            connection.query(sql.insert, [param.title, param.url, param.img, date], function (err, result) {
                if (err) {
                    console.log(err)
                    callback({
                        status: 0,
                        info: err
                    })
                }
                if (result) {
                    console.log('数据插入完成！')
                    callback({
                        status: 1,
                        info: result
                    })
                }
                connection.release()
                return
            });
            console.log('内部标记')
        });
        console.log('外部标记')
    },

    queryAll: function (param, callback) {
        let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        console.log(date)
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryAll, function (err, rows, fields) {
                if (err) {
                    console.log(err)
                    callback({
                        status: 0
                    })
                } else if (rows.length) {
                    let length = rows.length > 50 ? 50 : rows.length
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
                    callback({
                        status: 1,
                        data: JSON.parse(JSON.stringify(arr))
                    })
                } else {
                    callback({
                        status: 0
                    })
                }
                connection.release()
                return
            });
        });
    },
    queryByPage: function (page) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                }
                connection.query(sql.queryByPage, [(page - 1) * pageSize, pageSize], function (err, rows, fields) {
                    if(rows.length){
                        let length = rows.length
                        let arr = []
                        for(let i = 0; i < length; i++){
                            arr.push({
                                id: rows[i].id,
                                title: rows[i].title,
                                url: rows[i].url,
                                pic: rows[i].img,
                                time: rows[i].time
                            })
                        }
                        console.log(arr.toString())
                        resolve(arr)
                    }
                    else {
                        reject(new Error('未查询到数据!'))
                    }
                })
                connection.release()
            })
        })
    }
}