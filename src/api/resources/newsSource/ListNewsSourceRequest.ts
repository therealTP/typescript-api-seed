import { ListRequest } from '../../request/ListRequest';

export class ListNewsSourceRequest extends ListRequest {
    constructor(limit: number, offset: number) {
        super(limit, offset);
    }
}