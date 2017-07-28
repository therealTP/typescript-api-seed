export abstract class UpdateRequest<T> {
    id: string;
    body: T;

    constructor(id: string, body: T) {
        this.id = id;
        this.body = body;
    }
}