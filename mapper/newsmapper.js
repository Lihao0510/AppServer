/**
 * Created by lihao on 2017/2/1.
 */
module.exports = {
    insert: 'INSERT INTO news(title, url, img, time) VALUES(?,?,?,?)',
    update: 'UPDATE news set title=?, url=?, img=? where id=?',
    delete: 'delete from news where id=?',
    queryByName: 'select title, url, img, time from news where title like ?%',
    queryAll: 'select id, title, url, img, time from news order by id desc',
    queryByPage: 'SELECT id, title, url, img, time FROM news ORDER BY id DESC LIMIT ?, ?'
}