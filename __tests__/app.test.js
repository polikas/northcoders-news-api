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
        test.only('status code: 200', () => {
            return request(app)
            .get('/api/articles/2')
            .expect(200);
        })
    })
});