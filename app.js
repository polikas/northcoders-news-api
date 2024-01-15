const express = require('express');
const {getTopics} = require('./controllers/topics.controller')
const {getAvailableApis} = require('./controllers/api.controller')
const {serverErrors} = require('./errors');

const app = express();

app.get('/api/topics', getTopics);
app.get('/api', getAvailableApis);

app.use(serverErrors);


module.exports = app;