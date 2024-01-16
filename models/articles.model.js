const connection = require('../db/connection')

module.exports.fetchArticles = () => {
    return connection.query
    (`
    SELECT

    a.author, a.title,
    a.article_id, a.topic,
    a.created_at, a.votes,
    a.article_img_url, COUNT(c.article_id)::INT AS comment_count

    FROM articles a
    JOIN comments c
    ON a.article_id = c.article_id

    GROUP BY
    a.author, a.title,
    a.article_id, a.topic,
    a.created_at, a.votes,
    a.article_img_url

    ORDER BY created_at DESC;
    `).then((articles) => {
        return articles.rows;
    })
}