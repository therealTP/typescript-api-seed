// Import db object for use w/ extra custom methods
import { dbConnect } from './../../../database/DbConnect';

import { Dao } from './../../../database/Dao';
import { NewsSource } from './NewsSource';
import { CreateNewsSourceRequest } from './CreateNewsSourceRequest';
import { ReadNewsSourceRequest } from './ReadNewsSourceRequest';
import { UpdateNewsSourceRequest } from './UpdateNewsSourceRequest';
import { ListNewsSourceRequest } from './ListNewsSourceRequest';

export class NewsSourceDao extends Dao<NewsSource, ListNewsSourceRequest, CreateNewsSourceRequest, UpdateNewsSourceRequest> {
    constructor() {
        super('news_sources');
    }

    getResourceInstance() {
        return new NewsSource();
    }
}