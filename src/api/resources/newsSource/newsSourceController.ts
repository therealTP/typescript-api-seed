import { Request, Response } from 'express';
import { AbstractController, Controller } from './../../AbstractController';
import { NewsSource } from './NewsSource';
import { ListNewsSourceRequest } from './ListNewsSourceRequest';
import { ListNewsSourceResponse } from './ListNewsSourceResponse';
import { ReadNewsSourceRequest } from './ReadNewsSourceRequest';
import { ReadNewsSourceResponse } from './ReadNewsSourceResponse';
import { NewsSourceDao } from './NewsSourceDao';

export class NewsSourceController implements Controller<NewsSourceDao> {
    this.dao = NewsSourceDao;

    constructor() {
        // super(new NewsSourceDao());
        this.dao = new NewsSourceDao();
    }

    // public list = (req: Request, res: Response): void => {
    //     let requestData = new ListNewsSourceRequest(req.query.search, req.query.limit, req.query.offset);
    //     this.dao.find(requestData)
    //     .then(data => {
    //         let response = new ListNewsSourceResponse(data);
    //         res.json(response);
    //     })
    //     .catch(err => {
            
    //     });
    // }

    public list(req: Request, res: Response): void {
        let requestData = new ListNewsSourceRequest(req.query.search, req.query.limit, req.query.offset);
        this.dao.find(requestData)
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