import { SuccessResponse } from './SuccessResponse';

export abstract class ListSuccessResponse<T> extends SuccessResponse<T> {
    response: T[];
    constructor(response: T[]) {
        super();
        this.response = response;
    }
}