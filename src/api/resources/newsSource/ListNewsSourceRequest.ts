import { ListRequest } from '../../request/ListRequest';

export class ListNewsSourceRequest extends ListRequest {
    constructor(limit: string, offset: string, sort: string) {
        super(limit, offset, sort);
    }
}