const express = require('express');
const {getTopics} = require('./controllers/topics.controller')
const {getAvailableApis} = require('./controllers/api.controller')
const {getArticleById} = require('./controllers/articleById.controller')
const {getArticles} = require('./controllers/articles.controller')
const {serverErrors, psqlErrors, customErrors} = require('./errors');

const app = express();

app.get('/api/topics', getTopics);
app.get('/api', getAvailableApis);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles', getArticles);

app.use(psqlErrors);
app.use(customErrors);
app.use(serverErrors);



module.exports = app;