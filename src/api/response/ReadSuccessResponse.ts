import { SuccessResponse } from './SuccessResponse';

export abstract class ReadSuccessResponse<T> extends SuccessResponse<T> {
    constructor(response: T) {
        super(response);
    }
}