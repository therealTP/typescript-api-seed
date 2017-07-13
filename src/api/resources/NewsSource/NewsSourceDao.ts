/**
 * Import database connection object (pool/singleton)
 */
import { dbConnect } from './../../../database/DbConnect';

import { NewsSource } from './NewsSource';
import { ListNewsSourceRequest } from './ListNewsSourceRequest';
import { Dao } from './../../../database/Dao';

export class NewsSourceDao extends Dao<NewsSource, ListNewsSourceRequest> {
    constructor() {
        super('news_sources');
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

    // public async find(requestData: ListNewsSourceRequest): Promise<NewsSource[]> {
    //     let rows = await dbConnect.getTable(this.tableName).findAll();
    //     return rows.map(row => this._createNewsSourceFromRow(row));
    // }

    // public async findById(id: string): Promise<NewsSource> {
    //     let row = await dbConnect.getTable(this.tableName).findOne({id});
    //     return this._createNewsSourceFromRow(row);
    // }

    // public create(newsSource: NewsSource): Promise<NewsSource> {
    //     return await
    // }

    // public update(newsSourceId: string, updateData: NewsSourceUpdateRequest): Promise<any> {
    //     return await 
    // }

    // public delete(newsSourceId: string): Promise<any> {
    //     return await 
    // }
}