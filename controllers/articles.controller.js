const { error } = require('console');
const {fetchArticles} = require('../models/articles.model')

module.exports.getArticles = (request, response, next) => {
    fetchArticles().then((articles) => {
        response.status(200).send({articles});
    })
    .catch((error) => {
        next(error);
    })
}