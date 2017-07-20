import { Request, Response } from 'express';
import { Controller } from './../../ControllerInterface';
import { NewsSource } from './NewsSource';
import { CreateNewsSourceRequest } from './CreateNewsSourceRequest';
import { ListNewsSourceRequest } from './ListNewsSourceRequest';
import { ListNewsSourceResponse } from './ListNewsSourceResponse';
import { ReadNewsSourceRequest } from './ReadNewsSourceRequest';
import { ReadNewsSourceResponse } from './ReadNewsSourceResponse';
import { NewsSourceDao } from './NewsSourceDao';

export class NewsSourceController implements Controller {
    dao: NewsSourceDao;

    constructor() {
        this.dao = new NewsSourceDao();
    }

    public list = (req: Request, res: Response): void => {
        let requestData = new ListNewsSourceRequest(req.query.search, req.query.limit, req.query.offset);
        console.log("CTRL HIT", requestData);
        // let requestData = {limit: 5};
        this.dao.find(requestData)
        .then(data => {
            let response = new ListNewsSourceResponse(data);
            res.json(response);
        })
        .catch(err => {
            
        });
    }

    create(req: Request, res: Response): void {
        // By the time req data gets to this point, it's been validated
        const requestBody: NewsSource = req.body;

        // METHOD #1: pass request body into constructor & map
        try {
            const createRequest = new CreateNewsSourceRequest(requestBody);
            console.log("CREATE REQ", createRequest);
        } catch(e) {
            console.log("CREATE ERR", e);
        }

        res.send({});


        // METHOD #2: atypical setter method, like Java
        // createRequest.setName(body.name);

        // METHOD #3: TS-recommended setter method (w/ diff private prop name)
        // createRequest.websiteUrl = body.websiteUrl;

        // METHOD #4: make props public, assign in that way (seems to be same as TS setter)
        // createRequest.twitterUsername = body.twitterUsername;
        // createRequest.youtubeUsername = body.youtubeUsername;
        // createRequest.nonProfit = body.nonProfit;
        // createRequest.sellsAds = body.sellsAds;
        // createRequest.country = body.country;
        // createRequest.logoUrl = body.logoUrl;
        // createRequest.slug = body.slug;

        // this.dao.create(createRequest)
        // .then(data => {

        // })
        // .catch(err => {
        //     console.log("POST ERR", err);
        //     res.status(500).json({});
        // });


    }

    read(req: Request, res: Response): void {
        let requestData = new ReadNewsSourceRequest(req.params.id);
        this.dao.findById(requestData.id)
        .then(data => {
            let response = new ReadNewsSourceResponse(data);
            res.json(response);
        })
        .catch(err => {
            
        });
    }

    update(req: Request, res: Response): void {

    }

    delete(req: Request, res: Response): void {

    }
}