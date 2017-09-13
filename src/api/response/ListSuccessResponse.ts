import { SuccessResponse } from './SuccessResponse';

export abstract class ListSuccessResponse<T> extends SuccessResponse<T> {
    response: {results: T[]};
    constructor(response: T[]) {
        super({results: response});
    }
}