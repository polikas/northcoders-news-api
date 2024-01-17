const connection = require('../db/connection')

module.exports.deleteCommentById = (comment_id) => {
    return connection.query(`
    DELETE FROM comments
    WHERE comment_id = $1
    `, [comment_id])
    .then((result) => {
        if(result.rowCount === 0){
            return Promise.reject({status: 404, message: 'Not Found'});
        }
        return result.rows;
    })
}