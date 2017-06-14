export class ReadRequest {
    private _id: string;

    constructor(id: string) {
        this._id = id;
    }

    public getId() {
        return this._id;
    }
}