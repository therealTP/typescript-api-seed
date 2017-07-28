import { SuccessResponse } from './SuccessResponse';

export abstract class CreateSuccessResponse<T> extends SuccessResponse<T> {
    // Note: include full object that was just created in response
    constructor(createResponse: T) {
        super(createResponse);
    }
}