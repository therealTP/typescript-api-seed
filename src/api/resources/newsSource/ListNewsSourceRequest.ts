import { ListRequest } from '../../request/ListRequest';

export class ListNewsSourceRequest extends ListRequest {
    constructor(searchTerm: string, limit: number, offset: number) {
        super(searchTerm, limit, offset);
    }
}