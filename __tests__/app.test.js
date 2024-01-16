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
        test('status code: 200', () => {
            return request(app)
            .get('/api/articles/2')
            .expect(200);
        })
        test('should return an article by article_id', () => {
            return request(app)
            .get('/api/articles/4')
            .expect(200)
            .then(({body}) => {
                console.log(body, '<--- article Data');
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
});