export abstract class ListRequest {
    public search: string;
    public limit: number;
    public offset: number;

    constructor(search: string, limit: number, offset: number) {
        this.search = search;
        this.limit = limit;
        this.offset = offset;
    }
}