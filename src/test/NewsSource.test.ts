// Set ENV to 'TEST' to use a test DB
process.env.ENV = 'TEST';

// Require the dev-dependencies
import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { server } from './../index';
import { db } from './../database/db';

let expect = chai.expect;
let should = chai.should();
chai.use(chaiHttp);

describe('News Source Endpoints', () => {
    // Before block, make sure connected to DB: 
    before(() => {
        if (db.connected) {
            return Promise.resolve();
        } else {
            return db.connect();
        }   
    });

    describe('GET /source', () => {
        it('it should GET two news sources', () => {
            return chai.request(server)
            .get('/source?limit=2')
            .then(res => {
                res.should.have.status(200);
                expect(res.type).to.eql('application/json');
                expect(res.body.response.results).to.be.a('array');
                expect(res.body.response.results).to.have.length(2);
            });
        });

        it('it should search for a news source', () => {
            return chai.request(server)
            .get('/source?q=cn')
            .then(res => {
                res.should.have.status(200);
                expect(res.type).to.eql('application/json');
                expect(res.body.response.results).to.be.a('array');
                expect(res.body.response.results).to.have.length(1);
                expect(res.body.response.results[0].name).to.eql('CNN');
            });
        });
    });

    describe('GET /source/:id', () => {
        it('it should GET a news source by id', () => {
            return chai.request(server)
            .get('/source/cb9add7a-9018-4b32-bc44-b4509d932508')
            .then(res => {
                res.should.have.status(200);
                expect(res.type).to.eql('application/json');
                expect(res.body.response).to.be.a('object');
                expect(res.body.response).to.have.all.keys([
                    'name',
                    'id',
                    'websiteUrl'
                ]);
                expect(res.body.response.name).to.eql('CNN');
            });
        });
    });

});