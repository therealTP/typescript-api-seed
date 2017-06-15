import { Request, Response } from 'express';
import { NewsSource } from './../models/NewsSource';
import { NewsSourceListRequest } from './../models/NewsSourceListRequest';
import { NewsSourceListResponse } from './../models/NewsSourceListResponse';
import { ReadRequest } from './../models/ReadRequest';
import { ListSuccessResponse, ReadSuccessResponse } from './../models/Response';
import { NewsSourceDao } from './../database/daos/NewsSourceDao';

// init dao
let newsSourceDao = new NewsSourceDao();

export let newsSourceController = {
    list(req: Request, res: Response): void {
        let requestData = new NewsSourceListRequest(req.body.searchTerm, req.body.limit, req.body.offset);
        newsSourceDao.find(requestData)
        .then(data => {
            let response = new ListSuccessResponse<NewsSource>(data);
            res.json(response);
        })
        .catch(err => {
            
        });
    },
    create(req: Request, res: Response): void {

    },
    read(req: Request, res: Response): void {
        let requestData = new ReadRequest(req.params.id);
        newsSourceDao.findById(requestData.id)
        .then(data => {
            // TODO: implement standardized "ReadResponse" class
            let response = new ReadSuccessResponse<NewsSource>(data);
            res.json(response);
        })
        .catch(err => {
            
        });
    },
    update(req: Request, res: Response): void {

    },
    delete(req: Request, res: Response): void {

    }
}