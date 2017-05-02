/**
 * Created by lihao on 2017/5/2.
 */
var mysql = require('mysql');
var config = require('config-lite');
var pool = mysql.createPool(config.mysqlconf);

module.exports = pool;