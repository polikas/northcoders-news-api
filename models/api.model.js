const fs = require('fs/promises');


module.exports.fetchAvailableApis = (fileName) => {
    console.log('model');
    return fs.readFile(fileName, 'utf-8')
    .then((data) => {
        return data;
    }).catch((error) => {
        console.log(error, '<--- error');
    })
}