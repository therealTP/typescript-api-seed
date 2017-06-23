import { App } from './../App';
import { NewsSourceRouter } from 'api/resources/newsSource/NewsSourceRouter';

export class Api extends App {
    constructor() {
        super();
        this.setRoutes();
    }

    setRoutes() {
        // NEWS SOURCE ROUTES
        const newsSourceRouter = new NewsSourceRouter();
        this.app.use('/source', newsSourceRouter.router);

        // USER ROUTES

        // SUBSCRIPTION ROUTES
    }
}