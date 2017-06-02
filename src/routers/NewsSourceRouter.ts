import { AppRouter } from './AppRouter';
import * as newsSourceCtrl from './../controllers/newsSourceController';

export class NewsSourceRouter extends AppRouter {
    constructor() {
        super();
        this.setRoutes();
    }

    setRoutes() {
        this.router.get('/', newsSourceCtrl.list);
    }
}