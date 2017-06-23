import { ResponseInterface } from './ResponseInterface';

export class SuccessResponse<T> implements ResponseInterface {
    success: boolean;
    error: null;
    response: T | T[];

    constructor() {
        this.success = true;
        this.error = null;
    }
}