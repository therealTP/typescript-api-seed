import { AbstractRouter } from '../../AbstractRouter';
import { NewsSourceController } from './NewsSourceController';

export class NewsSourceRouter extends AbstractRouter<NewsSourceController> {
    constructor() {
        super(new NewsSourceController());
    }
}