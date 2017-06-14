export interface Dao {
    tableName: string,
    find(requestData: any): Promise<any>;
    findById(id: string): Promise<any>;
    // create(insertData: any): Promise<any>;
    // update(id: string, updateData: any): Promise<any>;
    // delete(id: string): Promise<any>;
}