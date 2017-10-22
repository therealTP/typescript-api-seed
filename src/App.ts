import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as boolParser from 'express-query-boolean';
import * as cors from 'cors';


// let allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// }

export class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.init();
        this.middleware();
    }

    // Init app settings/values
    private init(): void {
        this.app.set('port', (process.env.PORT || 3000));
        this.app.set('env', process.env.ENV);
    }



    // Configure Express middleware
    private middleware(): void {
        // if not testing, use logger:
        if (process.env.ENV !== 'TEST') this.app.use(logger('tiny'));
        // this.app.use(allowCrossDomain);
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    // Start application
    public start(): void {
        const port = this.app.get('port');
        const env = this.app.get('env');

        this.app.listen(port, () => {
            console.log('Listening on port %s', port);
        });
    }
}