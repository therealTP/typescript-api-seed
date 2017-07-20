/**
 * Import database connection object (pool/singleton)
 */
import { dbConnect } from './../../../database/DbConnect';

import { NewsSource } from './NewsSource';
import { CreateNewsSourceRequest } from './CreateNewsSourceRequest';
import { ReadNewsSourceRequest } from './ReadNewsSourceRequest';
import { ListNewsSourceRequest } from './ListNewsSourceRequest';
import { UpdateNewsSourceRequest } from './UpdateNewsSourceRequest';
import { Dao } from './../../../database/Dao';

export class NewsSourceDao extends Dao<NewsSource, ListNewsSourceRequest, CreateNewsSourceRequest, UpdateNewsSourceRequest> {
    map: any;
    
    constructor() {
        super('news_sources', 'create');
        this.map = {
            id: "id",
            name: "news_source_name",
            websiteUrl: "website_url",
            twitterUsername: "twitter_username",
            youtubeUsername: "youtube_username",
            nonProfit: "non_profit",
            sellsAds: "sells_ads",
            country: "country",
            logoUrl: "logo_url",
            slug: "slug"
        }
    }

    _createResourceInstanceFromRow(row: any): NewsSource {
        const newsSource = new NewsSource();

        for (var key in this.map) {
            newsSource[key] = row[this.map[key]];
        }

        return newsSource;
    }

    _mapListRequestData(requestData: ListNewsSourceRequest): any {
        
    }

    _mapCreateRequestData(requestData: any) {
        const tableData = {};

        for (var key in requestData) {
            tableData[this.map[key]] = requestData[key];
        }

        return tableData;
    }

    _mapUpdateRequestData(requestData: any) {

    }
}