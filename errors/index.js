module.exports.serverErrors = (error, request, response, next) => {
    response.status(500).send({message: 'Internal Server Error'});
}

module.exports.psqlErrors = (error, request, response, next) => {
    if(error.code === '22P02'){
        response.status(400).send({message: 'Bad Request'});
    } else { next(error) }
}

module.exports.customErrors = (error, request, response, next) => {
    if(error.status && error.message){
        response.status(404).send({message: 'Not Found'});
    } else { next(error) }
}