import { Response } from 'express';
import { UserError } from './UserError';
import { ErrorResponse } from './ErrorResponse';

export let handleDbErrorResponse = (err: any, code: string, res: Response) => {
    const error = new UserError(err.message, code);
    const errorResponse = new ErrorResponse(error);
    res.status(500).json(errorResponse);
}