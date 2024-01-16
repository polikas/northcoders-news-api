const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const fs = require('fs/promises');
const { expect } = require('@jest/globals');



beforeEach(() => seed(testData));
afterAll(() => connection.end());

describe("GET", () => {
    describe("GET /api/topics", () => {
        test('status code: 200', () => {
            return request(app)
            .get('/api/topics').expect(200)
        });
        test('should respond with an array of topics objects', () => {
            return request(app)
            .get('/api/topics')
            .then(({body}) => {
                body.topic.forEach((topics) => {
                    expect(topics).toHaveProperty('description', expect.any(String));
                    expect(topics).toHaveProperty('slug', expect.any(String));
                });
            });
        })
    });
    describe('GET /api', () => {
        test('should respond with all the available endpoints at the api', () => {
            return request(app)
            .get('/api')
            .expect(200)
            .then((response) => {
                return fs.readFile('endpoints.json', 'utf-8')
                .then((data) => {
                    expect(response.body).toEqual({apis: JSON.parse(data)});
                })
            })
        })
    })
    describe('GET /api/articles/:article_id', () => {
        test('status code: 200 it should return an article by article_id', () => {
            return request(app)
            .get('/api/articles/4')
            .expect(200)
            .then(({body}) => {
                expect(body.article).toEqual({article_id: 4, 
                    article_img_url: "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700", 
                    author: "rogersop", 
                    body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages", created_at: "2020-05-06T01:14:00.000Z", 
                    title: "Student SUES Mitch!", topic: "mitch", 
                    votes: 0})
            })
        })
        test('status 400 with message Bad Request if invalid_id has invalid data type', () => {
            return request(app)
            .get('/api/articles/invalid')
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe('Bad Request');
            })
        })
        test('status 404 with message Not Found if id does not exist', () => {
            return request(app)
            .get('/api/articles/45648')
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe('Not Found');
            })
        })
    })
    describe('GET /api/articles', () => {
        test('status code 200 should return articles with the appropriate properties', () => {
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({body}) => {
                expect(body.articles).toHaveLength(5);
                body.articles.forEach((article) => {
                    expect(article).toHaveProperty('author', expect.any(String));
                    expect(article).toHaveProperty('title', expect.any(String));
                    expect(article).toHaveProperty('article_id', expect.any(Number));
                    expect(article).toHaveProperty('topic', expect.any(String));
                    expect(article).toHaveProperty('created_at', expect.any(String));
                    expect(article).toHaveProperty('votes', expect.any(Number));
                    expect(article).toHaveProperty('article_img_url', expect.any(String));
                    expect(article).toHaveProperty('comment_count', expect.any(Number));
                })
            })
        })
        test('should sort articles in descending order', () => {
            return request(app)
            .get('/api/articles')
            .then(({body}) => {
                expect(body.articles).toBeSortedBy('created_at', {descending: true})
            })
        })
        test('status code 404 with a message Not Found e.g /api/articlesfsdf', () => {
            return request(app)
            .get('/api/articlesfsdf')
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe('Not Found');
            })
        })
    })
    describe('GET /api/articles/:article_id/comments', () => {
        test('status code 200 should get all comments for the given article_id and should have the appropriate properties', () => {
            return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then(({body}) => {
                expect(body.comments).toHaveLength(11);
                body.comments.forEach((comment) => {
                    expect(comment).toHaveProperty('comment_id', expect.any(Number));
                    expect(comment).toHaveProperty('votes', expect.any(Number));
                    expect(comment).toHaveProperty('created_at', expect.any(String));
                    expect(comment).toHaveProperty('author', expect.any(String));
                    expect(comment).toHaveProperty('body', expect.any(String));
                    expect(comment).toHaveProperty('article_id', expect.any(Number));
                })
            })
        })
        test('comments should be in most recent order', () => {
            return request(app)
            .get('/api/articles/1/comments')
            .then(({body}) => {
                expect(body.comments).toBeSortedBy('created_at', {descending: true});
            })
        })
        test('status 400 when :article_id is invalid data type, should return message Bad Request as well', () => {
            return request(app)
            .get('/api/articles/kasd/comments')
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe('Bad Request');
            })
        })
        test('status 404 when no url found and message should be Not Found', () => {
            return request(app)
            .get('/api/articles/1/test')
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe('Not Found');
            })
        })
    })
});