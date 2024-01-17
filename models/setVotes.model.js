const connection = require('../db/connection')

module.exports.setVotesByArticleId = (article_id, newVote) => {
    return connection.query(`
    UPDATE articles
    SET votes = votes + $2
    WHERE article_id = $1
    RETURNING *;
    `, [article_id, newVote])
    .then((result) => {
        return result.rows[0];
    })
}