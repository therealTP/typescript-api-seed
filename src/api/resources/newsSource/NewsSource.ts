import { CountryAbbrevType } from '../../../enums/CountryAbbrevType';

export class NewsSource {
    private id: string; 
    private name: string;
    private websiteUrl: string;
    private twitterUsername: string;
    private youtubeUsername: string;
    private nonProfit: boolean;
    private sellsAds: boolean;
    private country: CountryAbbrevType;
    private logoUrl: string;

    constructor(id: string, name: string, websiteUrl: string, twitterUsername: string, 
    youtubeUsername: string, nonProfit: boolean, sellsAds: boolean, country: CountryAbbrevType) {
        this.id = id;
        this.name = name;
        this.websiteUrl = websiteUrl;
        this.twitterUsername = twitterUsername;
        this.youtubeUsername = twitterUsername;
        this.nonProfit = nonProfit;
        this.sellsAds = sellsAds;
        this.country = country;
    }
}