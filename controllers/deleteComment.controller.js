const {deleteCommentById} = require('../models/deleteCommentById.model')

module.exports.deleteComment = (request, response , next) => {
    const {comment_id} = request.params;
    deleteCommentById(comment_id)
    .then((comment) => {
        response.status(204).send({comment});
    })
    .catch((error) => {
        next(error);
    })
}