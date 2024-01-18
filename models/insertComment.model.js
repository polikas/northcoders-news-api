const connection = require('../db/connection')

module.exports.insertComment = (article_id, author, comment) => {
    return connection.query(
        `
        SELECT * FROM users WHERE username = $1;
        `, [author]).then((authorResult) => {
            if(authorResult.rows.length === 0){
                return Promise.reject({status: 404, message: 'Not Found'});
            } else {
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
        })
   
}