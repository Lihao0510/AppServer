/**
 * Created by lihao on 2017/1/31.
 */
module.exports = {
    insert: 'INSERT INTO user(user_name, user_pwd, user_email, user_tel) VALUES(?,?,?,?)',
    update: 'update user set user_desc=?, user_img=?, user_age=? where user_name=?',
    delete: 'delete from user where user_name=?',
    queryByName: 'select user_name, user_id from user where user_name=? AND user_pwd=?',
    queryAll: 'select user_id, user_name, user_email, user_tel from user'
}