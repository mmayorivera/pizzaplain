import * as rpc from 'request-promise';
const log4js = require('log4js');
const logger = log4js.getLogger('IngredientsService');

export class IngredientsService {
    public model:string;
    constructor() {}

    count():Promise<any> {
        return new Promise<any>(function(resolve, reject) {
                return resolve({
                    success: true,
                    records : 10
                });
            });
        };

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
