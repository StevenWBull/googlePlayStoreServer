const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

describe('Get /apps endpoint', () => {
    it('should get an array', () => {
        return request(app).get('/apps').expect(200)
        .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf.at.least(1);
    
        });
    })

    it('should return 400 with invalid query', () => {
        return request(app).get('/apps').query({sort: "invalid"}).expect(400)
    })

    it('should return 400 with invalid query', () => {
        return request(app).get('/apps').query({search: "invalid"}).expect(400)
    })

});


