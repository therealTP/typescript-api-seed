import { PgDb, PgSchema, PgTable, QueryOptions } from 'pogi';

let dbConfig = {
    host: process.env.DB_URL,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    max: 10,
    idleTimeoutMillis: 10000, // close idle clients after 2s
    poolSize: 10
};

class Db {
    pgdb: PgDb;
    connected: boolean;

    constructor() {
        this.connected = false;
    }

    public async connect() {
        try {
            this.pgdb = await PgDb.connect(dbConfig);
            this.connected = true;
            console.log("DB Connected");
        } catch(e) {
            console.log("DB failed to connect. Err: ", e);
        }
    }

    public getTable(tableName: string) {
        if (this.connected) {
            return this.pgdb['tables'][tableName];
        } else {
            return null;
        }
    }

    public query(queryString: string, params: {}, options?: QueryOptions) {
        return this.pgdb.query(queryString, params, options);
    }
}

export let db = new Db();

