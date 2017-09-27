import { AbstractResource } from './../AbstractResource';
import { CountryAbbrevType } from '../../../enums/CountryAbbrevType';

export class NewsSource extends AbstractResource {
/*    private name: string;
    private websiteUrl: string;
    private slug: string;
    private logoUrl: string;
    private twitterUsername: string;
    private youtubeUsername: string;
    private nonProfit: boolean;
    private sellsAds: boolean;
    private country: CountryAbbrevType;*/

    public name: string;
    public websiteUrl: string;
    public slug: string;
    public logoUrl: string;
    public twitterUsername: string;
    public youtubeUsername: string;
    public nonProfit: boolean;
    public sellsAds: boolean;
    public country: CountryAbbrevType;
    public created: Date;

    constructor() {
        super();
    }

/*    public setName(name: string) {
        this.name = name;
    }

    public setWebsiteUrl(websiteUrl: string) {
        this.websiteUrl = websiteUrl;
    }

    public setSlug(slug: string) {
        this.slug = slug;
    }

    public setLogoUrl(logoUrl: string) {
        this.logoUrl = logoUrl;
    }

    public setTwitterUsername(twitterUsername: string) {
        this.twitterUsername = twitterUsername;
    }

    public setYoutubeUsername(youtubeUsername: string) {
        this.youtubeUsername = youtubeUsername;
    }

    public setNonProfit(nonProfit: boolean) {
        this.nonProfit = nonProfit;
    }

    public setSellsAds(sellsAds: boolean) {
        this.sellsAds = sellsAds;
    }

    public setCountry(country: CountryAbbrevType) {
        this.country = country;
    }*/
}