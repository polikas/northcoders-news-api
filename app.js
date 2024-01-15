const express = require('express');
const {getTopics} = require('./controllers/topics.controller')
const {customErrors, psqlErrors, serverErrors} = require('./errors');

const app = express();

app.get('/api/topics', getTopics);

app.use(serverErrors);


module.exports = app;