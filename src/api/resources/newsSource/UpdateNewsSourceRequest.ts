import { UpdateRequest } from './../../request/UpdateRequest';
import { UpdateNewsSourceDataInterface } from './UpdateNewsSourceDataInterface';

export class UpdateNewsSourceRequest extends UpdateRequest<UpdateNewsSourceDataInterface> {
    constructor(newsSourceId: string, updateData: UpdateNewsSourceDataInterface) {
        super(newsSourceId, updateData);
    }
}