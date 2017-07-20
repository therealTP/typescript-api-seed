import { dbConnect } from './DbConnect';

export abstract class Dao<ResourceType, ListRequestType, CreateRequestType, UpdateRequestType> {
    tableName: string;
    orderListResultsBy: string;

    constructor(tableName: string, orderListResultsBy: string) {
        this.tableName = tableName;
        this.orderListResultsBy = orderListResultsBy;
    }

    // Implemented in derived classes:
    // Map request data fcns:
    abstract _mapListRequestData(createRequestData: ListRequestType): any;
    abstract _mapCreateRequestData(createRequestData: CreateRequestType): any;
    abstract _mapUpdateRequestData(updateRequestData: UpdateRequestType): any;

    // Map response data fcns:
    abstract _createResourceInstanceFromRow(row: any): ResourceType;

    public async find(listRequest: ListRequestType): Promise<ResourceType[]> {
        // let listData = this._mapListRequestData(listRequest);
        console.log("FIND HIT!");
        const listData = {limit: 5};
        let rows = await dbConnect.getTable(this.tableName).findAll();
        console.log("ROWS", rows);
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

    // public async update(id: string, updateRequest: UpdateRequestType): Promise<ResourceType> {
    //     let updateData = this._mapUpdateRequestData(updateRequest);
    //     let updated = await dbConnect.getTable(this.tableName).updateAndGetOne({id}, updateData);
    //     return this._createResourceInstanceFromRow(updated);
    // }

    public async delete(id: string): Promise<{}> {
        let deleted = await dbConnect.getTable(this.tableName).delete({id});
        return {}; 
    }
}