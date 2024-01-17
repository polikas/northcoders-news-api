const {insertComment} = require('../models/insertComment.model')

module.exports.addComment = (request, response, next) => {
    const {article_id} = request.params;
    const {author, body} = request.body;
    insertComment(article_id, author, body)
    .then((comment) => {
        response.status(201).send({comment});
    })
    .catch((error) => {
        next(error);
    })
}