import { DeleteRequest } from '../../request/DeleteRequest';

export class DeleteNewsSourceRequest extends DeleteRequest {
    constructor(newsSourceId: string) {
        super(newsSourceId);
    }
}