import { v4 as uuid } from 'uuid';

export abstract class CreateRequest {
    private id: string;

    constructor() {
        this.id = uuid();
    }
}