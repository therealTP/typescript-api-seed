import { Request, Response } from 'express';
import { Controller } from './../../ControllerInterface';
import { NewsSource } from './NewsSource';
import { CreateNewsSourceRequest } from './CreateNewsSourceRequest';
import { CreateNewsSourceResponse } from './CreateNewsSourceResponse';
import { ListNewsSourceRequest } from './ListNewsSourceRequest';
import { ListNewsSourceResponse } from './ListNewsSourceResponse';
import { ReadNewsSourceRequest } from './ReadNewsSourceRequest';
import { ReadNewsSourceResponse } from './ReadNewsSourceResponse';
import { UpdateNewsSourceRequest } from './UpdateNewsSourceRequest';
import { DeleteNewsSourceRequest } from './DeleteNewsSourceRequest';
import { DeleteNewsSourceResponse } from './DeleteNewsSourceResponse';
import { NewsSourceDao } from './NewsSourceDao';

import { handleDbErrorResponse } from './../../errors/ErrorUtils';

export class NewsSourceController implements Controller {
    dao: NewsSourceDao;

    constructor() {
        this.dao = new NewsSourceDao();
    }

    public list = (req: Request, res: Response): void => {
        let listRequest = new ListNewsSourceRequest(req.query.limit, req.query.offset);
        let searchTerm: string = req.query.search;
        this.dao.find(listRequest, searchTerm)
        .then(data => {
            let listResponse = new ListNewsSourceResponse(data);
            res.json(listResponse);
        })
        .catch(err => {
            handleDbErrorResponse(err, 'err.dao_list', res);
        });
    }

    public create = (req: Request, res: Response): void => {
        // By the time req data gets to this point, it's been validated
        const payload = req.body;
        const createRequest = new CreateNewsSourceRequest();

        // Generate UUID here (not in class constructor)
        createRequest.generateUUID();
        // Assign to public props: fine for now!
        createRequest.name = payload.name;
        createRequest.websiteUrl = payload.websiteUrl;
        createRequest.slug = payload.slug;
        createRequest.logoUrl = payload.logoUrl;
        createRequest.twitterUsername = payload.twitterUsername;
        createRequest.youtubeUsername = payload.youtubeUsername;
        createRequest.nonProfit = payload.nonProfit;
        createRequest.sellsAds = payload.sellsAds;
        createRequest.country = payload.country;

        this.dao.create(createRequest)
        .then(data => {
            const createResponse = new CreateNewsSourceResponse(data);
            res.json(createResponse);
        })
        .catch(err => {
            handleDbErrorResponse(err, 'err.dao_create', res);
        });
    }

    public read = (req: Request, res: Response): void => {
        let readRequest = new ReadNewsSourceRequest(req.params.id);
        this.dao.findOne(readRequest)
        .then(data => {
            let response = new ReadNewsSourceResponse(data);
            res.json(response);
        })
        .catch(err => {
            handleDbErrorResponse(err, 'err.dao_read', res);
        });
    }

    public update = (req: Request, res: Response): void => {
        let updateRequest = new UpdateNewsSourceRequest(req.params.id, req.body);
        this.dao.update(updateRequest.id, updateRequest.body)
        .then(data => {
            let updateResponse = new ReadNewsSourceResponse(data);
            res.json(updateResponse);
        })
        .catch(err => {
            handleDbErrorResponse(err, 'err.dao_update', res);
        });
    }

    public delete = (req: Request, res: Response): void => {
        let deleteRequest = new DeleteNewsSourceRequest(req.params.id);
        this.dao.delete(deleteRequest.id)
        .then(data => {
            let deleteResponse = new DeleteNewsSourceResponse();
            res.json(deleteResponse);
        })
        .catch(err => {
            handleDbErrorResponse(err, 'err.dao_delete', res);
        });
    }
}