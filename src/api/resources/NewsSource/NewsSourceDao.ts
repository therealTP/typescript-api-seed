// Import db object for use w/ extra custom methods
import { dbConnect } from './../../../database/DbConnect';

import { Dao } from './../../../database/Dao';
import { NewsSource } from './NewsSource';
import { ListNewsSourceRequest } from './ListNewsSourceRequest';
import { CreateNewsSourceRequest } from './CreateNewsSourceRequest';
import { ReadNewsSourceRequest } from './ReadNewsSourceRequest';
import { UpdateNewsSourceDataInterface } from './UpdateNewsSourceDataInterface';
import { DeleteNewsSourceRequest } from './DeleteNewsSourceRequest';

export class NewsSourceDao extends Dao<NewsSource, ListNewsSourceRequest, CreateNewsSourceRequest, ReadNewsSourceRequest, UpdateNewsSourceDataInterface> {
    constructor() {
        super(
            'news_sources', 
            ['name', 'website_url'],
            ['non_profit', 'sells_ads', 'country']
        );
    }

    getResourceInstance() {
        return new NewsSource();
    }
}