export abstract class DeleteRequest {
    public id: string;

    constructor(id: string) {
        this.id = id;
    }
}