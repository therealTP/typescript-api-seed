// Useful examples:
// http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/#.WbhxGtOGNsM
// http://brianflove.com/2016/11/11/typescript-2-express-mongoose-mocha-chai/ 

// Set ENV to 'TEST' to use a test DB
process.env.ENV = 'TEST';

// Require the dev-dependencies
import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { server } from './../index';
import { db } from './../database/db';
import { NewsSource } from './../api/resources/NewsSource/NewsSource';

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

    describe('POST /source', () => {
        let newId;

        it('it should POST a news source', () => {
            var newsSource = new NewsSource();
            newsSource.name = 'MSNBC';
            newsSource.websiteUrl = 'www.msnbc.com';
            newsSource.nonProfit = false;
            newsSource.sellsAds = true;
            newsSource.twitterUsername = 'msnbc';
            newsSource.youtubeUsername = 'msnbc';

            return chai.request(server)
            .post('/source')
            .send(newsSource)
            .then(res => {
                res.should.have.status(200);
                expect(res.type).to.eql('application/json');
                expect(res.body.response).to.be.a('object');
                expect(res.body.response).to.have.all.keys([
                    "country",
                    "created",
                    "id",
                    "logoUrl",
                    "name",
                    "nonProfit",
                    "sellsAds",
                    "slug",
                    "twitterUsername",
                    "websiteUrl",
                    "youtubeUsername"
                ]);
                newId = res.body.response.id;
                expect(res.body.response.name).to.eql('MSNBC');
            });
        });

        it('it should DELETE a news source', () => {
            return chai.request(server)
            .del('/source/' + newId)
            .then(res => {
                res.should.have.status(200);
                expect(res.type).to.eql('application/json');
                expect(res.body.response).to.be.a('object');
                expect(res.body.response).to.eql({});
            });
        });
    });

});