import { ResponseInterface } from './ResponseInterface';

export class SuccessResponse<T> implements ResponseInterface {
    success: boolean;
    error: null;
    response: T | T[];

    constructor(response: T | T[]) {
        this.success = true;
        this.error = null;
        this.response = response;
    }
}