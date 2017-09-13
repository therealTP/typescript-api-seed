import { ResponseInterface } from './ResponseInterface';

export class SuccessResponse<T> implements ResponseInterface {
    success: boolean;
    error: null;
    response: T | {results: T[]};

    constructor(response: T | {results: T[]}) {
        this.success = true;
        this.error = null;
        this.response = response;
    }
}