const { response } = require('../app');
const {fetchAvailableApis} = require('../models/api.model')

module.exports.getAvailableApis = (request, respond, next) => {
    console.log('controller');
    const filePath = 'endpoints.json'
    fetchAvailableApis(filePath).then((data) => {
        const apis = JSON.parse(data);
        respond.status(200).send({apis});
    })
}