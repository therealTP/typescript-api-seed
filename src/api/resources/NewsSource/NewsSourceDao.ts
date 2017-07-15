/**
 * Import database connection object (pool/singleton)
 */
import { dbConnect } from './../../../database/DbConnect';

import { NewsSource } from './NewsSource';
import { CreateNewsSourceRequest } from './CreateNewsSourceRequest';
import { ReadNewsSourceRequest } from './ReadNewsSourceRequest';
import { ListNewsSourceRequest } from './ListNewsSourceRequest';
import { Dao } from './../../../database/Dao';

export class NewsSourceDao extends Dao<NewsSource, ListNewsSourceRequest, CreateNewsSourceRequest, UpdateNewsSourceRequest> {
    constructor() {
        super('news_sources', 'create');
    }

    _createResourceInstanceFromRow(row: any) {
        return new NewsSource(
            row.id, 
            row.news_source_name, 
            row.website_url,
            row.twitter_username,
            row.youtube_username,
            row.non_profit,
            row.sells_ads,
            row.country
        );
    }
}