import { NewsSource } from './NewsSource';
import { ReadSuccessResponse } from '../../response/ReadSuccessResponse';

export class ReadNewsSourceResponse<NewsSource> extends ReadSuccessResponse<NewsSource> {
    constructor(response: NewsSource) {
        super(response);
    }
}