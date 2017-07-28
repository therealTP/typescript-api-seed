import { UserError } from './../errors/UserError';

export interface ResponseInterface {
    success: boolean;
    error: UserError | null;
    response: any;
}

