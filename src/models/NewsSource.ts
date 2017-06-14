import { CountryAbbrevType } from './../enums/CountryAbbrevType';

export class NewsSource {
    public id: string; 
    public name: string;
    public websiteUrl: string;
    public twitterUsername: string;
    public youtubeUsername: string;
    public nonProfit: boolean;
    public sellsAds: boolean;
    public country: CountryAbbrevType;

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