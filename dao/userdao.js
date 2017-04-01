/**
 * Created by lihao on 2017/1/31.
 */
var mysql = require('mysql')
var config = require('config-lite')
var sql = require('../mapper/usermapper')
var pool = mysql.createPool(config.mysqlconf)

module.exports = {
    add: function (param, callback) {
        pool.getConnection(function (err, connection) {
            console.log(param)
            connection.query(sql.insert, [param.username, param.password, param.email, param.phone], function (err, result) {
                if (err) {
                    console.log(err)
                    callback({
                        status: 0,
                        info: err
                    })
                }
                if (result) {
                    callback({
                        status: 1,
                        info: result
                    })
                }
                connection.release()
                return
            });
        });
    },

    query: function (param, callback) {
        pool.getConnection(function (err, connection) {
            console.log(param)
            connection.query(sql.queryByName, [param.username, param.password], function (err, rows, fields) {
                if (err) {
                    console.log(err)
                    callback({
                        status: 0
                    })
                } else if (rows.length) {
                    console.log(rows[0])
                    callback({
                        status: 1,
                        info: rows[0]
                    })
                } else {
                    callback({
                        status: 0
                    })
                }
            })
            connection.release()
        })
    },
    queryAll: function (param, callback) {
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
                            id: rows[i].user_id,
                            name: rows[i].user_name,
                            email: rows[i].user_email,
                            tel: rows[i].user_tel
                        }
                        arr.splice(0, 0, obj)
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
            })
            connection.release()
        })
    }
}