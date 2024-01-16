const {fetchArticles} = require('../models/articles.model')

module.exports.getArticles = (request, response, next) => {
    fetchArticles().then((articles) => {
        response.status(200).send({articles});
    })
}