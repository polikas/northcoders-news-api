const connection = require('../db/connection');

module.exports.fetchTopics = () => {
    return connection.query(`SELECT * FROM topics;`).then((topicData) => {
        return topicData.rows;
    })
}