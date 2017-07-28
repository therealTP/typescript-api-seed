import { ResponseInterface } from './../response/ResponseInterface';
import { UserError } from './UserError';

export class ErrorResponse implements ResponseInterface {
    success: boolean;
    error: UserError;
    response: null;

    constructor(error: UserError) {
        this.success = false;
        this.error = error;
        this.response = null;
    }
}