const {fetchArticles} = require('../models/articles.model')

module.exports.getArticles = (request, response, next) => {
    const {sort_by, topic} = request.query;
    fetchArticles(sort_by, topic).then((articles) => {
        response.status(200).send({articles});
    })
    .catch((error) => {
        next(error);
    })
}