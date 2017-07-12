import { AbstractRouter } from '../../AbstractRouter';
import { NewsSourceController } from './NewsSourceController';

export class NewsSourceRouter extends AbstractRouter<NewsSourceController> {
    constructor() {
        super(new NewsSourceController());
        this.setRoutes();
    }

    setRoutes(): void {
        this.router.get('/', this.controller.list);
        this.router.post('/', this.controller.create);
        this.router.get('/:id', this.controller.read);
        this.router.put('/:id', this.controller.update);
        this.router.delete('/:id', this.controller.delete);
    }
}