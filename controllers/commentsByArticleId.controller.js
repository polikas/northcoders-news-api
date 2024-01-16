const {fetchCommentsByArticleId} = require('../models/commentsByArticleId.model')

module.exports.getCommentsByArticleId = (request, response, next) => {
    const {article_id} = request.params;
    fetchCommentsByArticleId(article_id)
    .then((comments) => {
        response.status(200).send({comments});
    })
    .catch((error) => {
        next(error);
    })
}