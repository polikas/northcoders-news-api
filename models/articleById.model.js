const connection = require('../db/connection');

module.exports.fetchArticleById = (article_id) => {
    return connection.query('SELECT * FROM articles WHERE article_id = $1', [article_id]).then((article) => {
        return article.rows[0];
    })
}