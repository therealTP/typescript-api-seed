import { CountryAbbrevType } from '../../../enums/CountryAbbrevType';
import { v4 as uuid } from 'uuid';

export class NewsSource {
    // private _id: string; 
    // private _name: string;
    // private _websiteUrl: string;
    // private _twitterUsername: string;
    // private _youtubeUsername: string;
    // private _nonProfit: boolean;
    // private _sellsAds: boolean;
    // private _country: CountryAbbrevType;
    // private _logoUrl: string;
    // private _slug: string;

    id: string; 
    name: string;
    websiteUrl: string;
    twitterUsername: string;
    youtubeUsername: string;
    nonProfit: boolean;
    sellsAds: boolean;
    country: CountryAbbrevType;
    logoUrl: string;
    slug: string;

    // public setId(id: string) {
    //     this.id = id;
    // }

/*    set id(id: string) {
        this._id = id;
    }

    set name(name: string) {
        this._name = name;
    }

    set websiteUrl(websiteUrl: string) {
        this._websiteUrl = websiteUrl;
    }

    set twitterUsername(twitterUsername: string) {
        this._twitterUsername = twitterUsername;
    }

    set youtubeUsername(youtubeUsername: string) {
        this._youtubeUsername = youtubeUsername;
    }

    set nonProfit(nonProfit: boolean) {
        this._nonProfit = nonProfit;
    }

    set sellsAds(sellsAds: boolean) {
        this._sellsAds = sellsAds;
    }

    set country(country: CountryAbbrevType) {
        this._country = country;
    }

    set logoUrl(logoUrl: string) {
        this._logoUrl = logoUrl;
    }

    set slug(slug: string) {
        this._slug = slug;
    }*/
}