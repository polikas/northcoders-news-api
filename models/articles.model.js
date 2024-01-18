const connection = require('../db/connection');

module.exports.fetchArticles = (sort_by = 'created_at', topic) => {

    let query = 
    `
    SELECT

    a.author, a.title,
    a.article_id, a.topic,
    a.created_at, a.votes,
    a.article_img_url, COUNT(c.article_id)::INT AS comment_count

    FROM articles a
    JOIN comments c
    ON a.article_id = c.article_id
    `;

    const queryParams = [];
    if(topic){
        query += ` WHERE topic = $1`;
        queryParams.push(topic);
    }
    query += 
    ` 
    GROUP BY
    a.author, a.title,
    a.article_id, a.topic,
    a.created_at, a.votes,
    a.article_img_url

    ORDER BY ${sort_by} DESC;
    `

    return connection.query(query, queryParams).then((articles) => {
        if(articles.rows.length === 0){
            return Promise.reject({status: 404, message: 'Not Found'});
        }
        return articles.rows;
    })
}