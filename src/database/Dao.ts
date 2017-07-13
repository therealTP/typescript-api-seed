// export interface Dao {
//     tableName: string,
//     find(requestData: any): Promise<any>;
//     findById(id: string): Promise<any>;
//     // create(insertData: any): Promise<any>;
//     // update(id: string, updateData: any): Promise<any>;
//     // delete(id: string): Promise<any>;
// }
import { dbConnect } from './DbConnect';

export abstract class Dao<ResourceType, ListRequest> {
    tableName: string;
    table: any;
    constructor(tableName: string) {
        this.tableName = tableName;
        this.table = dbConnect.getTable(this.tableName);
    }

    abstract _createResourceInstanceFromRow(row: any): ResourceType;

    public async find(requestData: ListRequest): Promise<ResourceType[]> {
        let rows = await dbConnect.getTable(this.tableName).findAll();
        // let rows = await this.table.findAll();
        return rows.map(row => this._createResourceInstanceFromRow(row));
    }
    
    public async findById(id: string): Promise<ResourceType> {
        let row = await dbConnect.getTable(this.tableName).findOne({id});
        return this._createResourceInstanceFromRow(row);
    }
}