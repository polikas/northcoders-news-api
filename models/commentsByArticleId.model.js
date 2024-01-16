const connection = require('../db/connection');

module.exports.fetchCommentsByArticleId = (article_id) => {
    return connection.query(`
    SELECT * FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC; 
    `, [article_id]).then((comments) => {
        return comments.rows;
    })
}