import { Request, Response } from 'express';

export abstract class AbstractController<DaoType> {
    private dao: DaoType;

    constructor(dao: DaoType) {
        this.dao = dao;
    }

    // public list = (req: Request, res: Response): void => {};
    abstract list(req: Request, res: Response): void;
    abstract create(req: Request, res: Response): void;
    abstract read(req: Request, res: Response): void;
    abstract update(req: Request, res: Response): void;
    abstract delete(req: Request, res: Response): void;
}

export interface Controller {
    dao: any;
    list: (req: Request, res: Response) => void;
    create: (req: Request, res: Response) => void;
    read: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}