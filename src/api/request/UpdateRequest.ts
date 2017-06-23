export abstract class UpdateRequest<T> {
    public id: string;
    public data: T;

    constructor(id: string, updateData: T) {
        this.id = id;
        this.data = updateData;
    }
}