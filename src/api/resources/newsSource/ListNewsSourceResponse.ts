import { NewsSource } from './NewsSource';
import { ListSuccessResponse } from '../../response/ListSuccessResponse';

export class ListNewsSourceResponse extends ListSuccessResponse<NewsSource> {
    constructor(newsSources: NewsSource[]) {
        super(newsSources);
    }
}