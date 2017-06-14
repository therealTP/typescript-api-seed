import { NewsSource } from './../../models/NewsSource';
import { NewsSourceListRequest } from './../../models/NewsSourceListRequest';
import { ReadRequest } from './../../models/ReadRequest';
import { dbConnect } from './../DbConnect';
import { Dao } from './Dao';

export class NewsSourceDao implements Dao {
    tableName: string;

    constructor() {
        this.tableName = 'news_sources';
    }

    public async find(requestData: NewsSourceListRequest): Promise<NewsSource[]> {
        let rows = await dbConnect.getTable(this.tableName).findAll();
        return rows.map(row => {
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
        });
    }

    public async findById(id: string): Promise<NewsSource> {
        let row = await dbConnect.getTable(this.tableName).findOne({id});
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