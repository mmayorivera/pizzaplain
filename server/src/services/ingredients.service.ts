const log4js = require('log4js');
const logger = log4js.getLogger('IngredientsService');
import {config} from '../config';
const ObjectID = require('mongodb').ObjectID;
export class IngredientsService {
    public model:string = 'Ingredient';
    client: any;
    constructor(connection: any) {
        this.client = connection.db(config.mongo.dbName).collection(this.model);
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
                    return reject(err.errmsg);
                }
                return resolve({
                    success: true,
                    records: {
                        _id: docs['insertedId'],
                        count: docs['insertedCount'],
                    }
                });
            });
        });
    }

    update(id:string , doc: any): Promise<any> {
        const self = this.client;
        return new Promise<any>(function(resolve, reject) {
            self.updateOne(
                {
                    _id: ObjectID(id)
                },
                {
                    $set: doc
                }

                , (err, docs) => {
                if (err) {
                    return reject(err);
                }
                return resolve({
                    success: true,
                    records: {
                        count: docs['modifiedCount'],
                    }
                });
            });
        });
    }

    delete(id:string ): Promise<any> {
        const self = this.client;
        return new Promise<any>(function(resolve, reject) {
            self.deleteOne(
                {
                    _id: ObjectID(id)
                }
                , (err, docs) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve({
                        success: true,
                        records: {
                            count: docs['deletedCount'],
                        }
                    });
                });
        });
    }


}

export default IngredientsService;
