import { ReadRequest } from 'api/request/ReadRequest';

export class ReadNewsSourceRequest extends ReadRequest {
    constructor(newsSourceId: string) {
        super(newsSourceId);
    }
}