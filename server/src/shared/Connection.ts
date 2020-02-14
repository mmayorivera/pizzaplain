
const MongoClient = require('mongodb').MongoClient;
import {config} from '../config';

export class Connection {
    static db: any;
    static connectToMongo() {
        if ( this.db ) return Promise.resolve(this.db);
        return MongoClient.connect(config.mongo.url, config.mongo.options, (err, client) => {
            if (err) {
                console.log(err);
            }
            console.log(client.db('admin'));
            this.db = client.db('admin');
        });
    }
}

export default Connection;
