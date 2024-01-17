const connection = require('../db/connection')

module.exports.insertComment = (article_id, author, comment) => {
    return connection.query(`
    INSERT INTO comments
    (article_id, author, body)
    VALUES
    ($1, $2, $3)
    RETURNING *;
    `, [article_id, author, comment])
    .then((result) => {
        return result.rows[0];
    })
}