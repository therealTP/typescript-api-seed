import { Request, Response } from 'express';

export abstract class AbstractController<DaoType> {
    dao: DaoType;

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

export interface Controller<DaoType> {
    dao: DaoType;
    list: (req: Request, res: Response) => {};
    create(req: Request, res: Response): void;
    read(req: Request, res: Response): void;
    update(req: Request, res: Response): void;
    delete(req: Request, res: Response): void;
}

// interface NoParamConstructor<T> {
//     new (): T;
// }

// class AbstractController<DaoType, ListRequestType, ListResponseType> {
//     dao: DaoType;

//     constructor(
//         daoConstructor: NoParamConstructor<DaoType>
//     ) {
//         this.dao = new daoConstructor();
//     }

//     list(req, res, listRequestConstructor: NoParamConstructor<ListRequestType>) {
//         let requestData = new listRequestConstructor(req.query.search, req.query.limit, req.query.offset);
//         // this.dao.find(requestData)
//         // .then(data => {
//         //     let response = new ListNewsSourceResponse(data);
//         //     res.json(response);
//         // })
//         // .catch(err => {
            
//         // });
//     }
// }

// class MyData {
//     user: string
// }

// class MyView extends View<MyData> {
//     constructor() {
//         // This will work because 'MyData' is also an entity
//         // in the value space.
//         super(MyData);
//     }
// }

var view = new MyView();