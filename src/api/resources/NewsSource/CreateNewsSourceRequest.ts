import { NewsSource } from './NewsSource';
import { CreateRequest } from './../../request/CreateRequest';
import { CountryAbbrevType } from '../../../enums/CountryAbbrevType';

export class CreateNewsSourceRequest extends CreateRequest {
    private name: string;
    private websiteUrl: string;
    private twitterUsername: string;
    private youtubeUsername: string;
    private nonProfit: boolean;
    private sellsAds: boolean;
    private country: CountryAbbrevType;
    private logoUrl: string;
    private slug: string;
    
    constructor(requestBody: NewsSource) {
        super();
        this.name = requestBody.name;
        this.websiteUrl = requestBody.websiteUrl;
        this.twitterUsername = requestBody.twitterUsername;
        this.youtubeUsername = requestBody.youtubeUsername;
        this.nonProfit = requestBody.nonProfit;
        this.sellsAds = requestBody.sellsAds;
        this.country = requestBody.country;
        this.logoUrl = requestBody.logoUrl;
        this.slug = requestBody.slug;
        this.slug = requestBody.test;
    }

    public setName(name: string) {
        this.name = name;
    }

    // set websiteUrl(url: string) {
    //     this._websiteUrl = url;
    // }
}