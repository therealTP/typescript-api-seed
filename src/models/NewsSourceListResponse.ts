import { NewsSource } from './NewsSource';

export class NewsSourceListResponse {
    public newsSources: NewsSource[];

    constructor(newsSources: NewsSource[]) {
        this.newsSources = newsSources;
    }
}