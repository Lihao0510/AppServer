/**
 * Created by lihao on 2017/1/30.
 */
module.exports = {

    checkLogin: function checkLogin(req, res, next) {
        if (!req.session.login) {
            return res.redirect('/users/login');
        }
        next();
    },

    checkNotLogin: function checkNotLogin(req, res, next) {
        if (req.session.login) {
            return res.redirect('back');//返回之前的页面
        }
        next();
    }
};