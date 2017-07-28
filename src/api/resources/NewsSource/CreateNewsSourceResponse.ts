import { NewsSource } from './NewsSource';
import { CreateSuccessResponse } from '../../response/CreateSuccessResponse';

export class CreateNewsSourceResponse extends CreateSuccessResponse<NewsSource> {
    constructor(newsSource: NewsSource) {
        super(newsSource);
    }
}