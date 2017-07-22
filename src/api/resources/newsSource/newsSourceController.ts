import { Request, Response } from 'express';
import { Controller } from './../../ControllerInterface';
import { NewsSource } from './NewsSource';
import { CreateNewsSourceRequest } from './CreateNewsSourceRequest';
import { ListNewsSourceRequest } from './ListNewsSourceRequest';
import { ListNewsSourceResponse } from './ListNewsSourceResponse';
import { ReadNewsSourceRequest } from './ReadNewsSourceRequest';
import { ReadNewsSourceResponse } from './ReadNewsSourceResponse';
import { NewsSourceDao } from './NewsSourceDao';
import { Error } from './../../errors/Error';
import { ErrorResponse } from './../../errors/ErrorResponse';

export class NewsSourceController implements Controller {
    dao: NewsSourceDao;

    constructor() {
        this.dao = new NewsSourceDao();
    }

    public list = (req: Request, res: Response): void => {
        let requestData = new ListNewsSourceRequest(req.query.search, req.query.limit, req.query.offset);
        // let requestData = {limit: 5};
        this.dao.find(requestData)
        .then(data => {
            let response = new ListNewsSourceResponse(data);
            res.json(response);
        })
        .catch(err => {
            const error = new Error(err.error, 'err.dao_list');
            const errorResponse = new ErrorResponse(error);
            res.status(500).json(errorResponse);
        });
    }

    public create = (req: Request, res: Response): void => {
        // By the time req data gets to this point, it's been validated
        const payload = req.body;

        // METHOD #1: pass request body into constructor & map
        const createRequest = new CreateNewsSourceRequest();
        // METHOD #1: named get/set methods
/*            createRequest.setName(payload.name);
        createRequest.setWebsiteUrl(payload.websiteUrl);
        createRequest.setSlug(payload.slug);
        createRequest.setLogoUrl(payload.logoUrl);
        createRequest.setTwitterUsername(payload.twitterUsername);
        createRequest.setYoutubeUsername(payload.youtubeUsername);
        createRequest.setNonProfit(payload.nonProfit);
        createRequest.setSellsAds(payload.sellsAds);
        createRequest.setCountry(payload.country);*/

        // METHOD #2: public props. FINE FOR NOW
        createRequest.generateUUID();
        createRequest.name = payload.name;
        createRequest.websiteUrl = payload.websiteUrl;
        createRequest.slug = payload.slug;
        createRequest.logoUrl = payload.logoUrl;
        createRequest.twitterUsername = payload.twitterUsername;
        createRequest.youtubeUsername = payload.youtubeUsername;
        createRequest.nonProfit = payload.nonProfit;
        createRequest.sellsAds = payload.sellsAds;
        createRequest.country = payload.country;

        console.log("CREATE REQ", createRequest);

        // res.send({});
        this.dao.create(createRequest)
        .then(data => {
            console.log("SUCCESS!", data);
            res.json(data);
        })
        .catch(err => {
            console.log("ERR TYPE", err.code, err.message);
            const error = new Error(err.message, 'err.dao_create');
            const errorResponse = new ErrorResponse(error);
            res.status(500).json(errorResponse);
        });
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