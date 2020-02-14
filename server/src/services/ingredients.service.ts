const log4js = require('log4js');
const logger = log4js.getLogger('IngredientsService');
import {config} from '../config';

export class IngredientsService {
    public model:string = 'Ingredient';
    client: any;
    constructor(connection: any) {
        this.client = connection.db(config.mongo.dbName).collection(this.model);
        this.client.db.runCommand( {
            collMod: 'Ingredient',
            validator: { $jsonSchema: {
                    bsonType: "object",
                    required: [ "description", "responsible","priority", "completed" ],
                    properties: {
                        name: {
                            bsonType: "string",
                            description: "must be a string and is required"
                        },
                        ico: {
                            bsonType: "string",
                            description: "must be a string and is required"
                        }
                    }
                } },
            validationLevel: "strict"
        } );
    }

    count():Promise<any> {
        const self = this.client;
        return new Promise<any>(function(resolve, reject) {
            self.countDocuments({}, (err, docs) => {
                if (err) {
                    return reject(err);
                }
                return resolve({
                    success: true,
                    records: docs
                });
            });
        });
    }

    all(page: number, limit: number): Promise<any> {
        const self = this.client;
        page = page-1 < 0 ? 1 : page;
        let skip = ((page - 1) * limit) + 1;
        skip = skip == 1 ? 0 : skip;
        return new Promise<any>(function(resolve, reject) {
            self.find({},
                {
                    limit: limit ,
                    skip: skip
                })
                .toArray((err, docs) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve({
                        success: true,
                        records: docs
                    });
            });
        });
    }

    add(doc: any): Promise<any> {
        const self = this.client;
        return new Promise<any>(function(resolve, reject) {
            self.insertOne(doc, (err, docs) => {
                if (err) {
                    return reject(err);
                }
                return resolve({
                    success: true,
                    records: docs
                });
            });
        });
    }


}

export default IngredientsService;
