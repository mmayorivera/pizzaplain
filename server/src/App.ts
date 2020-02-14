import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from "path";
import {config} from "dotenv";
import * as logger from 'morgan';
import * as ApiGeneralModels from './shared/models/api/general';
import IngredientsRouter from "./routes/ingredients.router";

class App {
    // ref to Express instance
    public express: express.Application;
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.models();
    }

    private models():void{
        // var _ingredientsModel = new IngredientsModel();
    }
    // Configure Express middleware.
    private middleware(): void {
        this.express.set('view engine', 'ejs');
        this.express.use(cors());
        this.express.use(logger('dev'));
        this.express.use('/node_modules', express.static(__dirname + '/node_modules'));
        this.express.use(express.static('public'));
        this.express.use(express.static(path.resolve(__dirname, 'client')));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));

        // this.express.use(express_jwt({
        //     secret: config.jwtSecret,
        //     getToken: function (req : any) {
        //         return req.query.token || req.body.token || req.params.token || req.headers['accesstoken'];
        //     }
        // }).unless({ path: [
        //         '/api/v1/user/authorize',
        //         '/api/v1/resource'
        //     ] }));
        this.express.use(function (err:any, req :any , res:any, next:any) {
            if (err.name === 'UnauthorizedError') {
                var apiResponse = new ApiGeneralModels.ApiResponse();
                apiResponse.message = "Secure Zone Buddy...";
                res.status(401).send(apiResponse);
            }
        });
    }

    // Configure API endpoints.
    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.sendFile(__dirname + '/client/index.html');
        });
        // router.get('/*', function (req, res) {
        //     res.sendFile(__dirname + '/client/index.html');
        // });
        this.express.use('/', router);
        this.express.use('/api/v1/ingr', IngredientsRouter);
    }

}
export default new App().express;
