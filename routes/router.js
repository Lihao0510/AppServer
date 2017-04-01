/**
 * Created by lihao on 2017/2/1.
 */
module.exports = function (app) {
    app.use('/', require('./index'));
    app.use('/users', require('./users'));
    app.use('/news', require('./news'));
    app.use('/funny', require('./funny'));
    app.use('/lol', require('./lol'))
    app.use('/beauty', require('./beauty'))
    app.use('/homepage', require('./homepage'))
}