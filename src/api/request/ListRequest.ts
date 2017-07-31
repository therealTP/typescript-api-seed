// Source: http://pogi.readthedocs.io/en/latest/API/QueryOptions/
import { QueryOptions } from 'pogi';

export abstract class ListRequest implements QueryOptions {
    public limit: number;
    public offset: number;
    public skipUndefined: boolean;

    constructor(limit: number, offset: number) {
        this.limit = limit;
        this.offset = offset;
        this.skipUndefined = true; // default
    }
}