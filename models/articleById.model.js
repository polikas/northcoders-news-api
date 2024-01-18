const connection = require('../db/connection');

module.exports.fetchArticleById = (article_id) => {
    return connection.query(`
    SELECT a.*, COUNT(c.article_id)::INT AS comment_count FROM articles a 
    LEFT JOIN comments c 
    ON a.article_id = c.article_id 
    WHERE a.article_id = $1 
    GROUP BY a.article_id;`, [article_id])
    .then((article) => {
        if(article.rows.length === 0){
            return Promise.reject({status: 404, message: 'Not Found'});
        }
        return article.rows[0];
    })
}