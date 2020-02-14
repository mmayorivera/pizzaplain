import * as rpc from 'request-promise';
const log4js = require('log4js');
const logger = log4js.getLogger('IngredientsService');
import {config} from '../config';

export class IngredientsService {
    public model:string = 'test';
    client: any;
    constructor(connection: any) {
        this.client = connection.db(config.mongo.dbName).collection(this.model);
    }

    count():Promise<any> {
        const self = this.client;
        return new Promise<any>(function(resolve, reject) {
          self.find({}).toArray((err, docs) => {
                return resolve({
                    success: true,
                    records: docs
                });
            });


        });
    }

    all(page: number, limit: number): Promise<any> {
        page = page-1 < 0 ? 1 : page;
        let skip = ((page - 1) * limit) + 1;
        skip = skip == 1 ? 0 : skip;
        return new Promise<any>(function(resolve, reject) {
            return resolve({
                success: true,
                records: 10,
                results: []
            });
        });
    }

}

export default IngredientsService;
