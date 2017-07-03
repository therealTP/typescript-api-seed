import { Error } from './../errors/Error';

export interface ResponseInterface {
    success: boolean;
    error: Error | null;
    response: any;
}

