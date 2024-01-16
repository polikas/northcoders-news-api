const connection = require('../db/connection');

module.exports.fetchArticleById = (article_id) => {
    return connection.query('SELECT * FROM articles WHERE article_id = $1', [article_id])
    .then((article) => {
        if(article.rows.length === 0){
            return Promise.reject({status: 404, message: 'Not Found'});
        }
        return article.rows[0];
    })
}