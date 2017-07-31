import { dbConnect } from './DbConnect';
import { camelizeKeys, decamelizeKeys } from 'humps';

export abstract class Dao<ResourceType, ListRequestType, CreateRequestType, ReadRequestType, UpdateRequestDataType> {
    tableName: string;
    searchFields: string[];

    constructor(tableName: string, searchFields: string[]) {
        this.tableName = tableName;
        this.searchFields = searchFields;
    }

   /**
    * Util function to be used in derived Dao classes
    * Generates a single instance of the ResourceType
    */
    abstract getResourceInstance(): ResourceType;

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

    private generateSearchMap(searchTerm: string): any {
        const searchMap = {
            or: []
        };

        this.searchFields.forEach(field => {
            const fieldMap = {
                // ILIKE = case insensitive
                [`${field} ilike`]: `%${searchTerm}%`
            };

            searchMap.or.push(fieldMap);
        });

        return searchMap;
    }

    /*
    BASIC CRUD FUNCTIONS
    More specific DAO methods defined/implemented in derived classes
    */
    public async find(listRequest: ListRequestType, searchTerm: string): Promise<ResourceType[]> {
        // let listData = this.mapListRequestData(listRequest);
        // const listData = {limit: 5};
        let rows;

        if (this.searchFields.length && searchTerm) {
            let searchMap = this.generateSearchMap(searchTerm);
            rows = await dbConnect.getTable(this.tableName).find(searchMap, listRequest);
        } else {
            rows = await dbConnect.getTable(this.tableName).findAll(listRequest);
        }

        return rows.map(row => this.createResourceInstanceFromRow(row));
        
        
    }
    
    public async findOne(readRequest: ReadRequestType): Promise<ResourceType> {
        let row = await dbConnect.getTable(this.tableName).findOne(readRequest);
        return this.createResourceInstanceFromRow(row);
    }

    public async create(createRequest: CreateRequestType): Promise<ResourceType> {
        let createData = decamelizeKeys(createRequest);
        let created = await dbConnect.getTable(this.tableName).insertAndGet(createData);
        return this.createResourceInstanceFromRow(created);
    }

    public async update(id: string, updates: UpdateRequestDataType): Promise<ResourceType> {
        let updateData = decamelizeKeys(updates);
        let updated = await dbConnect.getTable(this.tableName).updateAndGetOne({id}, updateData);
        return this.createResourceInstanceFromRow(updated);
    }

    // Would only delete by id, so this method accepts string id
    public async delete(id: string): Promise<{}> {
        let deleted = await dbConnect.getTable(this.tableName).delete({id});
        return {}; 
    }
}