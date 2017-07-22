import { dbConnect } from './DbConnect';
import { camelizeKeys, decamelizeKeys } from 'humps';

export abstract class Dao<ResourceType, ListRequestType, CreateRequestType, UpdateRequestType> {
    tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

   /**
    * Util function to be used in derived Dao classes
    * Generates a single instance of the ResourceType
    */
    abstract getResourceInstance(): ResourceType;

    /*
    REQUEST MAP FUNCTIONS
    Used to map request class props to db column names
    TODO: do I need these?! can use humps methods
    */
    private mapListRequestData(request: ListRequestType): any {
        
    }
    
    private mapCreateRequestData(request: CreateRequestType): any {
        return decamelizeKeys(request);
    }

    private mapUpdateRequestData(request: UpdateRequestType): any {
        return decamelizeKeys(request);
    }

   /*
    RESPONSE MAP FUNCTIONS
    Used to map db column names to request class props
    */
    private createResourceInstanceFromRow(row: any): ResourceType {
        // convert row prop names to camel case (to match resource prop names)
        const camelRow = camelizeKeys(row);
        
        // Create instance of resource type
        const resourceInstance = this.getResourceInstance();

        // assign camelizedRow props to resource instance
        Object.assign(resourceInstance, camelRow);

        return resourceInstance;
    }

    /*
    BASIC CRUD FUNCTIONS
    More specific DAO methods defined/implemented in derived classes
    */
    public async find(listRequest: ListRequestType): Promise<ResourceType[]> {
        // let listData = this.mapListRequestData(listRequest);
        const listData = {limit: 5};
        let rows = await dbConnect.getTable(this.tableName).findAll();
        return rows.map(row => this.createResourceInstanceFromRow(row));
    }
    
    public async findById(id: string): Promise<ResourceType> {
        let row = await dbConnect.getTable(this.tableName).findOne({id});
        return this.createResourceInstanceFromRow(row);
    }

    public async create(createRequest: CreateRequestType): Promise<ResourceType> {
        let createData = decamelizeKeys(createRequest);
        console.log("CREATE DATA", createData);
        let created = await dbConnect.getTable(this.tableName).insertAndGet(createData, {return: ['id']});

        return this.createResourceInstanceFromRow(created);
    }

    public async update(id: string, updateRequest: UpdateRequestType): Promise<ResourceType> {
        let updateData = decamelizeKeys(updateRequest);
        let updated = await dbConnect.getTable(this.tableName).updateAndGetOne({id}, updateData);
        return this.createResourceInstanceFromRow(updated);
    }

    public async delete(id: string): Promise<{}> {
        let deleted = await dbConnect.getTable(this.tableName).delete({id});
        return {}; 
    }
}