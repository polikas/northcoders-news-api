const express = require('express');
const cors = require('cors');
const {getTopics} = require('./controllers/topics.controller')
const {getAvailableApis} = require('./controllers/api.controller')
const {getArticleById} = require('./controllers/articleById.controller')
const {getArticles} = require('./controllers/articles.controller')
const {getCommentsByArticleId} = require('./controllers/commentsByArticleId.controller')
const {getUsers} = require('./controllers/getUsers.controller')
const {addComment} = require('./controllers/addComment.controller')
const {updateVotesByArticleId} = require('./controllers/updateVotes.controller')
const {deleteComment} = require('./controllers/deleteComment.controller')
const {serverErrors, psqlErrors, customErrors} = require('./errors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api', getAvailableApis);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id/comments', getCommentsByArticleId);
app.get('/api/users', getUsers);

app.post('/api/articles/:article_id/comments', addComment);

app.patch('/api/articles/:article_id', updateVotesByArticleId);

app.delete('/api/comments/:comment_id', deleteComment);

app.use(psqlErrors);
app.use(customErrors);
app.use(serverErrors);

app.use((request, response, next) => {
    response.status(404).send({message: 'Not Found'});
})

module.exports = app;