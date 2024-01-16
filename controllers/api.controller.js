const apis = require('../endpoints.json');

module.exports.getAvailableApis = (request, response, next) => {
    response.status(200).send({apis});
}