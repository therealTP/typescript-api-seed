// Import db object for use w/ extra custom methods
import { db } from './../../../database/db';
import { DaoConfigInterface } from './../../../database/DaoConfigInterface';

import { Dao } from './../../../database/Dao';
import { NewsSource } from './NewsSource';
import { ListNewsSourceRequest } from './ListNewsSourceRequest';
import { CreateNewsSourceRequest } from './CreateNewsSourceRequest';
import { ReadNewsSourceRequest } from './ReadNewsSourceRequest';
import { UpdateNewsSourceDataInterface } from './UpdateNewsSourceDataInterface';
import { DeleteNewsSourceRequest } from './DeleteNewsSourceRequest';

export class NewsSourceDao extends Dao<NewsSource, ListNewsSourceRequest, CreateNewsSourceRequest, ReadNewsSourceRequest, UpdateNewsSourceDataInterface> {
    constructor() {
        const daoConfig: DaoConfigInterface = {
            tableName: 'news_sources',
            searchFields: ['name', 'website_url'],
            filterFields: ['non_profit', 'sells_ads', 'country'],
            sortFields: ['created', 'name'],
            defaultOffset: 0,
            defaultLimit: 15,
            defaultSort: ['name'],
            // findManyCustomQuery: `SELECT * FROM news_sources`,
            findOneCustomQuery: `SELECT name, website_url, id FROM news_sources WHERE id=:id`,
            // TODO:
        };
        super(daoConfig);
    }

    getResourceInstance() {
        return new NewsSource();
    }
}