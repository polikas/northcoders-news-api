const {setVotesByArticleId} = require('../models/setVotes.model')

module.exports.updateVotesByArticleId = (request, response, next) => {
    const {article_id} = request.params;
    const {votes: newVote} = request.body;
    setVotesByArticleId(article_id, newVote)
    .then((vote) => {
        response.status(200).send({inc_vote: vote});
    })
    .catch((error) => {
        next(error);
    })
}