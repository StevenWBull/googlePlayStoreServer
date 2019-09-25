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
  });

  it('should return 400 with invalid sort query', () => {
    return request(app).get('/apps').query({sort: 'invalid'}).expect(400);
  });

  it('should return 400 with invalid search query', () => {
    return request(app).get('/apps').query({search: 'invalid'}).expect(400);
  });

  it('should return the proper search', () => {

    const searchQuery = 'card';

    return request(app).get('/apps').query({ search: searchQuery }).expect(200)
      .then( res => {
        expect(res.body).to.be.an('array');
        expect(res.body[0]['Genres'].toLowerCase()).to.be.eql( searchQuery );
      });
  });

  it('should sort data properly', () => {
    return request(app).get('/apps').query({ sort: 'rating' }).expect(200)
      .then( res => {
        expect(res.body).to.be.an('array');

        let sorted = true;
        let i = 0;

        while( i < res.body.length - 1 ) {
          
          const appsAtIndex = res.body[i];
          const appsAtNextIndex = res.body[i + 1];

          if( appsAtIndex['Rating'] < appsAtNextIndex['Rating']) {
            sorted = false;
            break;
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
});


