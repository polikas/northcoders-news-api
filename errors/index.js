module.exports.serverErrors = (error, request, respond, next) => {
    respond.status(500).send({message: 'Internal Server Error'});
}