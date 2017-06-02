import { App } from './App';
import { NewsSourceRouter } from './routers/NewsSourceRouter';

export class Api extends App {
    constructor() {
        super();
    }

    setRoutes() {
        const newsSourceRouter = new NewsSourceRouter();
        this.app.use('/source', newsSourceRouter.router);
    }
}