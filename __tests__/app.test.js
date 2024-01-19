const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const fs = require('fs/promises');



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
                expect(body.article).toHaveProperty('author', expect.any(String))
                expect(body.article).toHaveProperty('title', expect.any(String))
                expect(body.article).toHaveProperty('article_id', expect.any(Number))
                expect(body.article).toHaveProperty('body', expect.any(String))
                expect(body.article).toHaveProperty('topic', expect.any(String))
                expect(body.article).toHaveProperty('created_at', expect.any(String))
                expect(body.article).toHaveProperty('votes', expect.any(Number))
                expect(body.article).toHaveProperty('article_img_url', expect.any(String))
                expect(body.article).toHaveProperty('comment_count', expect.any(Number));
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
        test('status 200 should return empty array if article exists but no comments', () => {
            return request(app)
            .get('/api/articles/2/comments')
            .expect(200)
            .then(({body}) => {
                expect(body.comments).toHaveLength(0);
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
            .get('/api/articles/1000/comments')
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe('Not Found');
            })
        })
    })
    describe('GET /api/users', () => {
        test('status 200 should return all users object with appropriate properties', () => {
            return request(app)
            .get('/api/users')
            .expect(200)
            .then(({body}) => {
                body.users.forEach((user) => {
                    expect(user).toHaveProperty('username', expect.any(String));
                    expect(user).toHaveProperty('name', expect.any(String));
                    expect(user).toHaveProperty('avatar_url', expect.any(String));
                });
            });
        });
    });
    describe('GET /api/articles?topic=mitch', () => {
        test('status 200 should response with all the articles for given query topic', () => {
            return request(app)
            .get('/api/articles?topic=mitch')
            .expect(200)
            .then(({body}) => {
                expect(body.articles.forEach((article) => {
                    expect(article.topic).toBe('mitch');
                }));
            });
        });
        test('status 404 with message Not Found if topic does not exist', () => {
            return request(app)
            .get('/api/articles?topic=jhkjh')
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe('Not Found');
            })
        })
    });
});

describe('POST', () => {
    describe('POST /api/articles/:article_id/comments', () => {
        test('status 201 created should add a comment to comments table with appropriate properties', () => {
            return request(app)
            .post('/api/articles/1/comments')
            .send( 
                {
                    author: 'butter_bridge',
                    body: 'my first comment'
                })
            .expect(201)
            .then(({body}) => {
                expect(body.comment).toHaveProperty('author');
                expect(body.comment).toHaveProperty('body');
            })
        })
        test('status 400 Bad Request message due to invalid data', () => {
            return request(app)
            .post('/api/articles/1/comments')
            .send(
                {
                    author: 'butter_bridge'
                })
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe('Bad Request');
            })
        })
        test('status 400 Bad Request message due to invalid data', () => {
            return request(app)
            .post('/api/articles/1432742/comments')
            .send(
                {
                    author: 'butter_bridge'
                })
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe('Bad Request');
            })
        })
        test('status 404 Not Found message', () => {
            return request(app)
            .post('/api/articles/1/commentygfks')
            .send(
                {
                    author: 'butter_bridge',
                    body: 'my first comment'
                })
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe('Not Found');
            })
        })
        test('status 404 Not Found message', () => {
            return request(app)
            .post('/api/articles/1/comments')
            .send(
                {
                    author: 'khjhkjh',
                    body: 'my first comment'
                })
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe('Not Found');
            })
        })
    })
})

describe('PATCH', () => {
    describe('PATCH /api/articles/:article_id', () => {
        test('status code 200 should update an article vote column for given article_id ', () => {
            return request(app)
            .patch('/api/articles/1')
            .send({votes: 50})
            .expect(200)
            .then(({body}) => {
                expect(body.inc_vote).toHaveProperty('article_id', expect.any(Number))
                expect(body.inc_vote).toHaveProperty('title', expect.any(String))
                expect(body.inc_vote).toHaveProperty('topic', expect.any(String))
                expect(body.inc_vote).toHaveProperty('author', expect.any(String))
                expect(body.inc_vote).toHaveProperty('body', expect.any(String))
                expect(body.inc_vote).toHaveProperty('created_at', expect.any(String))
                expect(body.inc_vote.votes).toBe(100 + 50)
                expect(body.inc_vote).toHaveProperty('article_img_url', expect.any(String))
            })
        })
        test('status 400 with message Bad Request when invalid data type is passed in to the body', () => {
            return request(app)
            .patch('/api/articles/1')
            .send({votes: 'hello'})
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe('Bad Request');
            })
        })
        test('status 404 with message Not Found when article id does not exist', () => {
            return request(app)
            .patch('/api/articles/1000')
            .send({votes: 50})
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe('Not Found');
            })
        })
        test('status 400 with message Bad Request when invalid data type is passed in to the endpoint', () => {
            return request(app)
            .patch('/api/articles/hello')
            .send({votes: 50})
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe('Bad Request');
            })
        })
    })
})

describe('DELETE', () => {
    describe('DELETE /api/comments/:comment_id', () => {
        test('status 204 No Content should delete a comment for given comment id', () => {
            return request(app)
            .delete('/api/comments/1')
            .expect(204)
            .then(({body}) => {
                expect(body).toEqual({});
            })
        })
        test('status 404 with message Not Found', () => {
            return request(app)
            .delete('/api/comments/8989')
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe('Not Found');
            })
        })
        test('status 400 with message Bad Request', () => {
            return request(app)
            .delete('/api/comments/test')
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe('Bad Request');
            })
        })
    })
})