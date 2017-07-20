export abstract class UpdateRequest {
    private _id: string;
    // public data: T;

    constructor(id: string) {
        this._id = id;
        // this.data = updateData;
    }

    get id() {
        return this._id;
    }
}