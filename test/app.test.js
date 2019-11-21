const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GET /apps endpoint', () => {
    it('should return an array of apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                    const app = res.body[0];
                    expect(app).to.include.all.keys(
                    'App', 'Category', 'Rating','Genres'
                    );
            });
    });

    it('should return a response', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.not.equal(null);
            });
    });

    it('should be 400 if sort is incorrect', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'MISTAKE' })
            .expect(400, 'Sort must be one of Rating or App');
    });

    it('should sort by App', () => {
        return supertest(app)
          .get('/apps')
          .query({ sort: 'App' })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array');
            let sorted = true;
    
            let i = 0;
            while (i < res.body.length - 1) {
              const appAtI = res.body[i];
              const appAtIPlus1 = res.body[i + 1];
              if (appAtIPlus1.App < appAtI.App) {
                sorted = false;
                break;
              }
              i++;
            }
            expect(sorted).to.be.true;
          });
    }); 
    
    it('should be 400 if Genres is incorrect', () => {
        return supertest(app)
            .get('/apps')
            .query({ genres: 'MISTAKE' })
            .expect(400, 'Genres must be on of Action, Puzzle, Strategy, Casual, Arcade, Card');
    });

    it('should sort genres Puzzle', () => {
        return supertest(app)
          .get('/apps')
          .query({ genres: 'Puzzle' })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array');
            let sorted = true;
    
            let i = 0;
            while (i < res.body.length - 1) {
              const genresAtI = res.body[i];
              const genresAtIPlus1 = res.body[i + 1];
              if (genresAtIPlus1.Puzzle < genresAtI.Puzzle) {
                sorted = false;
                break;
              }
              i++;
            }
            expect(sorted).to.be.true;
          });
    });
})