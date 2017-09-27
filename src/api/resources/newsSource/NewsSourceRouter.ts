import { AbstractRouter } from '../../AbstractRouter';
import { NewsSourceController } from './NewsSourceController';
import { handleValidationError } from './../../errors/handleValidationError';
import { listValidator, readValidator, createValidator, updateValidator, deleteValidator } from './NewsSourceRequestValidators'

export class NewsSourceRouter extends AbstractRouter<NewsSourceController> {
    constructor() {
        super(new NewsSourceController());
    }

    setRoutes(): void {
        this.router.get('/', listValidator, handleValidationError, this.controller.list);
        this.router.post('/', createValidator, handleValidationError, this.controller.create);
        this.router.get('/:id', readValidator, handleValidationError, this.controller.read);
        this.router.put('/:id', updateValidator, handleValidationError, this.controller.update);
        this.router.delete('/:id', deleteValidator, handleValidationError, this.controller.delete);
    }
}