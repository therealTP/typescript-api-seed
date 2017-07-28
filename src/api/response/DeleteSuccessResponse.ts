import { SuccessResponse } from './SuccessResponse';

export class DeleteSuccessResponse extends SuccessResponse<{}> {
    // NEWLY UPDATED OBJECT OR EMPTY OBJECT AS SUCCESS?
    constructor() {
        super({});
    } 
}