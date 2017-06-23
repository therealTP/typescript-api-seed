export abstract class ReadRequest {
    public id: string;

    constructor(id: string) {
        this.id = id;
    }
}