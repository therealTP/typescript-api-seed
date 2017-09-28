import { AbstractRouter } from '../../AbstractRouter';
import { NewsSourceController } from './NewsSourceController';
import { handleValidationErrorMiddleware } from './../../errors/errorUtils';
import { listValidator, readValidator, createValidator, updateValidator, deleteValidator } from './NewsSourceRequestValidators'

export class NewsSourceRouter extends AbstractRouter<NewsSourceController> {
    constructor() {
        super(new NewsSourceController());
    }

    setRoutes(): void {
        this.router.get('/', listValidator, handleValidationErrorMiddleware, this.controller.list);
        this.router.post('/', createValidator, handleValidationErrorMiddleware, this.controller.create);
        this.router.get('/:id', readValidator, handleValidationErrorMiddleware, this.controller.read);
        this.router.put('/:id', updateValidator, handleValidationErrorMiddleware, this.controller.update);
        this.router.delete('/:id', deleteValidator, handleValidationErrorMiddleware, this.controller.delete);
    }
}