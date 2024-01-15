const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');



beforeEach(() => seed(testData));
afterAll(() => connection.end());

describe("GET", () => {
    describe("GET /api/topics", () => {
        test('status code: 200 should return all topics with the appropriate properties', () => {
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
});