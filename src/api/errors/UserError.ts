export class UserError {
    message: string;
    code: string;

    constructor(message: string, code: string) {
        this.message = message;
        this.code = code;
    }
}