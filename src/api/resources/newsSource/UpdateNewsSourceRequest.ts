import { UpdateRequest } from 'api/request/UpdateRequest';
import { UpdateNewsSourceDataInterface } from './UpdateNewsSourceDataInterface';

export class UpdateNewsSourceRequest<UpdateNewsSourceDataInterface> extends UpdateRequest<UpdateNewsSourceDataInterface> {
    constructor(newsSourceId: string, updateData: UpdateNewsSourceDataInterface) {
        super(newsSourceId, updateData);
    }
}