import { ResponseInterface } from './../response/ResponseInterface';
import { Error } from './Error';

export class ErrorResponse implements ResponseInterface {
    success: boolean;
    error: Error;
    response: null;

    constructor(error: Error) {
        this.success = false;
        this.error = error;
        this.response = null;
    }
}