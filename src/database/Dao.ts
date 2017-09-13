import { QueryOptions } from 'pogi';
import { camelizeKeys, decamelizeKeys } from 'humps';
import * as lo from 'lodash';

import { db } from './db';
import { DaoConfigInterface } from './DaoConfigInterface';
import { ListRequest } from './../api/request/ListRequest';
import { SearchMap, FilterMap, FindMap } from './daoMaps';

export abstract class Dao<ResourceType, ListRequestType extends ListRequest, CreateRequestType, ReadRequestType, UpdateRequestDataType> {
    tableName: string;
    searchFields: string[];
    filterFields: string[];
    sortFields: string[];
    defaultOffset: number;
    defaultLimit: number;
    defaultSort: string[];
    findManyCustomQuery: string;
    findOneCustomQuery: string;

    constructor(config: DaoConfigInterface) {
        this.tableName = config.tableName;
        this.searchFields = config.searchFields;
        this.filterFields = config.filterFields;
        this.sortFields = config.sortFields;
        this.defaultOffset = config.defaultOffset;
        this.defaultLimit = config.defaultLimit;
        this.defaultSort = config.defaultSort;
        this.findManyCustomQuery = config.findManyCustomQuery;
        this.findOneCustomQuery = config.findOneCustomQuery;
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

    /*
     FIND/LIST UTIL FUNCTIONS
     Used to parse/map request data from ctrl to Pogi format
     Assign defaults, restrict fields, etc. 
     */
    private generateQueryMap(queryOptions: ListRequestType) {

        // set defaults
        if (!queryOptions.offset && queryOptions.offset !== 0) queryOptions.offset = this.defaultOffset;
        if (!queryOptions.limit && queryOptions.limit !== 0) queryOptions.limit = this.defaultLimit;

        // if orderBy arr exists, remove non-matching sort fields:
        if (queryOptions.orderBy) {
            // remove sort fields that are not options:
            lo.remove(queryOptions.orderBy, field => {
                const validField = this.sortFields.some(sortField => {
                    return field.includes(sortField);
                });

                return !validField;
            });
        } else {
            queryOptions.orderBy = this.defaultSort;
        }

        return queryOptions;
    }

    private generateSearchMap(searchTerm: string): SearchMap {
        const searchMap = {
            or: []
        };

        if (searchTerm) {
            this.searchFields.forEach(field => {
                const fieldMap = {
                    // ILIKE = case insensitive
                    [`${field} ilike`]: `%${searchTerm}%`
                };

                searchMap.or.push(fieldMap);
            });
        }

        return searchMap;
    }

    private generateFilterMap(filterQuery: {}): FilterMap {
        const filterMap = {
            and: []
        };

        // for each possible filterable field:
        this.filterFields.forEach(field => {
            const fieldVals = filterQuery[field];
            
            // if query contains val for that field:
            if (fieldVals) {
                const fieldValsArr = fieldVals.split(",");

                const fieldMap = {
                    [field]: fieldValsArr
                };

                filterMap.and.push(fieldMap);
            }
        });

        return filterMap;
    }

    private generateFindMap(searchMap: SearchMap, filterMap: FilterMap): FindMap {
        const findMap = {};

        if (searchMap.or.length || filterMap.and.length) {
            findMap['and'] = [];

            if (searchMap.or.length) {
                findMap['and'].push(searchMap);
            }

            if (filterMap.and.length) {
                findMap['and'].push(filterMap);
            }
        }
        
        return findMap;
    }

    /*
    BASIC CRUD FUNCTIONS
    More specific DAO methods defined/implemented in derived classes
    */
    public async findMany(queryOptions: ListRequestType, searchTerm: string, filterFields: {}): Promise<ResourceType[]> {
        // options for query:
        let queryMap = this.generateQueryMap(queryOptions);
        
        let searchMap = this.generateSearchMap(searchTerm);
        let filterMap = this.generateFilterMap(filterFields);
        let findMap = this.generateFindMap(searchMap, filterMap);
        
        let rows;   
        // if a custom query exists in DAO config:
        if (this.findManyCustomQuery) {
            // run the custom query w/ find map as params:
            rows = await db.query(this.findManyCustomQuery, findMap, queryMap);
        } else {
            rows = await db.getTable(this.tableName).find(findMap, queryMap);
        }
        return rows.map(row => this.createResourceInstanceFromRow(row));
    }
    
    public async findOne(readRequest: ReadRequestType): Promise<ResourceType> {
        let row;
        // if a custom query exists in DAO config:
        if (this.findOneCustomQuery) {
            // run the custom query w/ readRequest as params:
            row = await db.query(this.findOneCustomQuery, readRequest);
        } else {
            row = await db.getTable(this.tableName).findOne(readRequest);
        }
        return this.createResourceInstanceFromRow(row[0]);
    }

    public async create(createRequest: CreateRequestType): Promise<ResourceType> {
        // Right now, request data must map to DB columns (camelCase to snake_case)
        let createData = decamelizeKeys(createRequest);
        let created = await db.getTable(this.tableName).insertAndGet(createData);
        return this.createResourceInstanceFromRow(created);
    }

    public async update(id: string, updates: UpdateRequestDataType): Promise<ResourceType> {
        // Right now, request data must map to DB columns (camelCase to snake_case)
        let updateData = decamelizeKeys(updates);
        let updated = await db.getTable(this.tableName).updateAndGetOne({id}, updateData);
        return this.createResourceInstanceFromRow(updated);
    }

    // Would only delete by id, so this method accepts string id
    public async delete(id: string): Promise<{}> {
        let deleted = await db.getTable(this.tableName).delete({id});
        return {}; 
    }
}