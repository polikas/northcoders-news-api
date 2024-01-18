const connection = require('../db/connection');

module.exports.fetchCommentsByArticleId = (article_id) => {

    return connection.query(`
    SELECT * FROM articles
    WHERE article_id = $1
    `, [article_id]).then((article) => {
        if(article.rows.length > 0){
            return connection.query(`
            SELECT * FROM comments
            WHERE article_id = $1
            ORDER BY created_at DESC; 
            `, [article_id]).then((comments) => {
                return comments.rows;
            })
        } else {
            return Promise.reject({status: 404, message: 'Not Found'});
        }
    })

    
}