import { NewsSource } from './NewsSource';

export class NewsSourceListRequest {
    public searchTerm: string;
    public limit: number;
    public offset: number;

    constructor(searchTerm: string, limit: number, offset: number) {
        this.searchTerm = searchTerm;
        this.limit = limit;
        this.offset = offset;
    }
}