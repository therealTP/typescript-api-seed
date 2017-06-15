import { Error } from './Error';

abstract class Response {
    success: boolean;
    error: Error | null;

    constructor(success: boolean, error: Error | null) {
        this.success = success;
        this.error = error;
    }
}

export class ErrorResponse extends Response {
    constructor(error: Error) {
        super(false, error);
    }
}

export class SuccessResponse extends Response {
    constructor() {
        super(true, null);
    }
}

export class ReadSuccessResponse<T> extends SuccessResponse {
    response: T;
    constructor(response: T) {
        super();
        this.response = response;
    }
}

export class ListSuccessResponse<T> extends SuccessResponse {
    response: T[];
    constructor(response: T[]) {
        super();
        this.response = response;
    }
}

export class CreateSuccessResponse<T> extends SuccessResponse {
    // THIS ONE SHOULD HAVE ID OF CREATED IN RESPONSE
}

export class UpdateSuccessResponse<T> extends SuccessResponse {
    // NEWLY UPDATED OBJECT OR EMPTY OBJECT AS SUCCESS? 
}

export class DeleteSuccessResponse<T> extends SuccessResponse {
    // NEWLY UPDATED OBJECT OR EMPTY OBJECT AS SUCCESS? 
}

