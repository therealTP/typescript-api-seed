/*
* Use this suite of util functions to standardize errors from all layers of application
*
*/
import { Request, Response, NextFunction } from 'express';
import { MappedError } from 'express-validator/shared-typings';
import { validationResult } from 'express-validator/check';
import { UserError } from './UserError';
import { ErrorResponse } from './ErrorResponse';
import { errors } from './errors';
import { logger } from './logger';

/* 
* Generic function to generate error response, log, + respond
* 
*/
let generateErrorAndLog = (code: string, details: string[]): UserError => {
    // look up code's error message, if it exists:
    const message = (errors[code] || "Unexpected error");
        
    // create user error from message + code:
    const error = new UserError(message, code, details);

    // log error
    logger.log(error);

    return error;
}

let handleErrorResponse = (code: string, details: string[], res: Response, status: number): void => {
    const error = generateErrorAndLog(code, details);

    // create error response
    const errorResponse = new ErrorResponse(error);
    
    // send error response w/ default 500 status code (if no status)
    res.status((status || 500)).json(errorResponse);
}

/*
* --- DATABASE ERROR FUNCTIONS ---
*/
export let handleDbErrorResponse = (err: any, res: Response): void => {
    let details = parseDatabaseError(err.message);
    handleErrorResponse("err.database_query_error", details, res, 500);
}

export let handleDbConnectionError = (err: any): void => {
    let details = parseDatabaseError(err.message);
    // look up code's error message, if it exists:
    generateErrorAndLog("err.database_connect_error", details);
}

let parseDatabaseError = (message: string) => {
    return [message.replace(/\"/g, "'").replace(/""/g, '"')];
}

/*
* --- VALIDATION ERROR FUNCTIONS ---
*/
export let handleValidationErrorMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    // Get the validation result whenever you want; see the Validation Result API for all options!
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // TODO: create details array w/ this:x
        let details = errors.array().map(mapValidationErrorToString);
        handleErrorResponse("err.invalid_request", details, res, 422);
    } else {
        next();
    }
}

let mapValidationErrorToString = (error: MappedError) => {
    return `${error.msg} '${error.value}' in ${error.location}`;
}