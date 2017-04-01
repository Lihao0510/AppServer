/**
 * Created by lihao on 2017/2/3.
 */
module.exports = {
    insert: 'INSERT INTO funny(title, url, img, time) VALUES(?,?,?,?)',
    update: 'UPDATE funny SET title=?, url=?, img=? WHERE id=?',
    delete: 'DELETE FROM funny WHERE id=?',
    queryByName: 'SELECT title, url, img, time from funny WHERE title LIKE ?%',
    queryAll: 'SELECT id, title, url, img, time FROM funny ORDER BY id DESC',
    queryByPage: 'SELECT id, title, url, img, time FROM funny ORDER BY id DESC LIMIT ?, ?'
}