module.exports.customErrors = (error, request, respond, next) => {}

module.exports.psqlErrors = (error, request, respond, next) => {}

module.exports.serverErrors = (error, request, respond, next) => {
    respond.status(500).send({message: 'Internal Server Error'});
}