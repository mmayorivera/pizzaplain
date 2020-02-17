const log4js = require('log4js');
const logger = log4js.getLogger('IngredientsService');
import {config} from '../config';
const ObjectID = require('mongodb').ObjectID;

export class DataService {
    public model:string;
    client: any;
    constructor(connection: any, model: string) {
        this.model = model;
        this.client = connection.db(config.mongo.dbName).collection(this.model);
    }

    count():Promise<any> {
        const self = this.client;
        return new Promise<any>((resolve, reject) => {
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
        return new Promise<any>((resolve, reject) => {
            self.find({},
                {
                    limit: limit ,
                    skip: skip
                })
                .toArray((err, docs) => {
                    if (err) {
                        return reject(err);
                    }
                    this.count().then( nbr => {
                        return resolve({
                            success: true,
                            totalRecords: nbr.records,
                            records: docs
                        });
                    });
            });
        });
    }

    in(ids: String): Promise<any> {
        const self = this.client;
        const inPayload = [];
        console.log(ids);
        ids.split(",").forEach((_id) => {
            inPayload.push(ObjectID(_id))
        }) ;
        return new Promise<any>((resolve, reject) => {
            self.find(
                { _id: { $in: inPayload } }
                )
                .toArray((err, docs) => {
                    if (err) {
                        return reject(err);
                    }
                    this.count().then( nbr => {
                        return resolve({
                            success: true,
                            totalRecords: nbr.records,
                            records: docs
                        });
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

    byId(id:string): Promise<any> {
        const self = this.client;
        return new Promise<any>(function(resolve, reject) {
            self.findOne( {
                _id: ObjectID(id)
            }, (err, docs) => {
                if (docs === null) {
                    return reject( 'Not Found' );
                }
                if (err) {
                    return reject(err.errmsg );
                }
                return resolve({
                    success: true,
                    records: {
                        found: docs,
                        count: 1
                    }

                });
            });
        });
    }

    update(id:string , doc: any): Promise<any> {
        const self = this.client;
        return new Promise<any>((resolve, reject) => {
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
        return new Promise<any>((resolve, reject) => {
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

export default DataService;
