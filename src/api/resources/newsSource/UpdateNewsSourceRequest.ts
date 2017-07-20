import { UpdateRequest } from './../../request/UpdateRequest';
import { UpdateNewsSourceDataInterface } from './UpdateNewsSourceDataInterface';

export class UpdateNewsSourceRequest extends UpdateRequest {
    constructor(newsSourceId: string, updateData: UpdateNewsSourceDataInterface) {
        super(newsSourceId);
    }
}