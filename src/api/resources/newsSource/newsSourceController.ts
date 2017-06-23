import { Request, Response } from 'express';
import { ControllerInterface } from 'api/ControllerInterface';
import { NewsSource } from 'api/resources/newsSource/NewsSource';
import { ListNewsSourceRequest } from 'api/resources/newsSource/ListNewsSourceRequest';
import { ListNewsSourceResponse } from 'api/resources/newsSource/ListNewsSourceResponse';
import { ReadNewsSourceRequest } from 'api/resources/newsSource/ReadNewsSourceRequest';
import { ReadNewsSourceResponse } from 'api/resources/newsSource/ReadNewsSourceResponse';

import { NewsSourceDao } from 'database/daos/NewsSourceDao';

export class NewsSourceController implements ControllerInterface {
    constructor() {}

    list(req: Request, res: Response): void {
        let requestData = new ListNewsSourceRequest(req.query.search, req.query.limit, req.query.offset);
        let newsSourceDao = new NewsSourceDao();
        newsSourceDao.find(requestData)
        .then(data => {
            let response = new ListNewsSourceResponse(data);
            res.json(response);
        })
        .catch(err => {
            
        });
    }

    create(req: Request, res: Response): void {

    }

    read(req: Request, res: Response): void {
        let requestData = new ReadNewsSourceRequest(req.params.id);
        let newsSourceDao = new NewsSourceDao();
        newsSourceDao.findById(requestData.id)
        .then(data => {
            // TODO: implement standardized "ReadResponse" class
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

export let newsSourceController = new NewsSourceController();