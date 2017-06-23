import { Error } from 'api/errors/Error';

export interface ResponseInterface {
    success: boolean;
    error: Error | null;
    response: any;
}

