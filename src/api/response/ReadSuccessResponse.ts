import { SuccessResponse } from './SuccessResponse';

export abstract class ReadSuccessResponse<T> extends SuccessResponse<T> {
    response: T;
    constructor(response: T) {
        super();
        this.response = response;
    }
}