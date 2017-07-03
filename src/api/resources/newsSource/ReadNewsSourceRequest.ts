import { ReadRequest } from '../../request/ReadRequest';

export class ReadNewsSourceRequest extends ReadRequest {
    constructor(newsSourceId: string) {
        super(newsSourceId);
    }
}