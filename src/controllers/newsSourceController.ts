import { Request, Response } from 'express';
import { NewsSource } from './../models/NewsSource';
import { NewsSourceListRequest } from './../models/NewsSourceListRequest';
import { NewsSourceListResponse } from './../models/NewsSourceListResponse';
import { ReadRequest } from './../models/ReadRequest';
import { NewsSourceDao } from './../database/daos/NewsSourceDao';

// init dao
let newsSourceDao = new NewsSourceDao();

export let newsSourceController = {
    list(req: Request, res: Response): void {
        let requestData = new NewsSourceListRequest(req.body.searchTerm, req.body.limit, req.body.offset);
        newsSourceDao.find(requestData)
        .then(data => {
            let newsSourceListResponse = new NewsSourceListResponse(data);
            res.json(newsSourceListResponse);
        })
        .catch(err => {
            
        });
    },
    create(req: Request, res: Response): void {

    },
    read(req: Request, res: Response): void {
        let requestData = new ReadRequest(req.params.id);
        newsSourceDao.findById(requestData.getId())
        .then(data => {
            // TODO: implement standardized "ReadResponse" class
            res.json(data);
        })
        .catch(err => {
            
        });
    },
    update(req: Request, res: Response): void {

    },
    delete(req: Request, res: Response): void {

    }
}