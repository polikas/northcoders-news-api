const {fetchTopics} = require('../models/topics.model');

module.exports.getTopics = (request,respond,next) => {
    fetchTopics().then((topic) => {
        respond.status(200).send({topic});
    })
    .catch((error) => {
        next(error);
    })
}