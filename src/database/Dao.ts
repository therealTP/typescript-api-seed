// export interface Dao {
//     tableName: string,
//     find(requestData: any): Promise<any>;
//     findById(id: string): Promise<any>;
//     // create(insertData: any): Promise<any>;
//     // update(id: string, updateData: any): Promise<any>;
//     // delete(id: string): Promise<any>;
// }
import { dbConnect } from './DbConnect';

export abstract class Dao<ResourceType, ListRequestType, CreateRequestType, UpdateRequestType> {
    tableName: string;
    orderResultsBy: string;

    constructor(tableName: string, orderResultsBy: string) {
        this.tableName = tableName;
        this.orderResultsBy = orderResultsBy;
    }

    // Implemeneted in derived classes:
    // Map request data fcns:
    abstract _mapCreateRequestData(createRequestData: CreateRequestType): any;
    abstract _mapUpdateRequestData(updateRequestData: UpdateRequestType): any;

    // Map response data fcns:
    abstract _createResourceInstanceFromRow(row: any): ResourceType;

    public async find(requestData: ListRequestType): Promise<ResourceType[]> {
        let rows = await dbConnect.getTable(this.tableName).findAll();
        return rows.map(row => this._createResourceInstanceFromRow(row));
    }
    
    public async findById(id: string): Promise<ResourceType> {
        let row = await dbConnect.getTable(this.tableName).findOne({id});
        return this._createResourceInstanceFromRow(row);
    }

    public async create(createRequest: CreateRequestType): Promise<ResourceType> {
        let createData = this._mapCreateRequestData(createRequest);
        let created = await dbConnect.getTable(this.tableName).insertAndGet(createData);
        return this._createResourceInstanceFromRow(created);
    }

    public async update(id: string, updateRequest: UpdateRequestType): Promise<ResourceType> {
        let updateData = this._mapUpdateRequestData(updateRequest);
        let updated = await dbConnect.getTable(this.tableName).updateAndGetOne({id}, updateData);
        return this._createResourceInstanceFromRow(updated);
    }

    public async delete(id: string): Promise<{}> {
        let row = await dbConnect.getTable(this.tableName).delete({id});
        return {}; 
    }
}