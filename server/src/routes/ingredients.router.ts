import {Router, Request, Response, NextFunction} from 'express';
import {IngredientsReponse, IngredientsRequest, IngredientsResponsePayload} from '../shared/models/api/ingredients';
import { InvalidRequest } from '../shared/models/exceptions/ingredients';
import IngredientsService from "../services/ingredients.service";
const humanize = require('humanize');
export class IngredientsRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public async count(req: Request, res: Response, next: NextFunction){
        const response = new IngredientsReponse();
        response.payload = new IngredientsResponsePayload();
        const _ingredientsService = new IngredientsService(req['db']);
        const startTime = humanize.time();
        try{
            const list = await _ingredientsService.count();
            const endMark = humanize.time();
            const elapsed =  endMark - startTime;
            response.payload = list;
            response.message = ` ${ list.records }(s) ${IngredientsRouter.name} [${elapsed} (ms)]`;
        } catch(err) {
            if(err instanceof InvalidRequest){
                response.message = err.message;
                res.statusCode = 400;//bad request
            } else{
                response.message = "error";
                res.statusCode = 500;//internal server error
            }
        }
        res.send(response);
    }

    public async all(req: Request, res: Response, next: NextFunction){
        const response = new IngredientsReponse();
        const request= new IngredientsRequest();
        request.payload = req.query;
        response.payload = new IngredientsResponsePayload();
        const _ingredientsService = new IngredientsService(req['db']);
        const startTime = humanize.time();
        try{
            if(request.payload.page==null){
                throw new InvalidRequest("Page No. is missing");
            } else if(request.payload.limit==null){
                throw new InvalidRequest("Limit is missing");
            }
            var pageNo = parseInt(request.payload.page.toString());
            var pageLimit = parseInt(request.payload.limit.toString());
            var events = await _ingredientsService.all(
                pageNo,
                pageLimit
            );
            const endMark = humanize.time();
            const elapsed =  endMark - startTime;
            response.payload = events;
            response.message = ` ${ events.records.length }(s) ${IngredientsRouter.name} [${elapsed} (ms)]`;
        } catch(err) {
            if(err instanceof InvalidRequest){
                response.message = err.message;
                res.statusCode = 400;//bad request
            }else{
                response.message = "error";
                res.statusCode = 500;//internal server error
            }
        }
        res.send(response);
    }

    public async add(req: Request, res: Response, next: NextFunction){
        const response = new IngredientsReponse();
        const request= new IngredientsRequest();
        request.payload.body = req.body;
        response.payload = new IngredientsResponsePayload();
        var _ingredientsService = new IngredientsService(req['db']);
        const startTime = humanize.time();
        try{
            if(request.payload.body==null){
                throw new InvalidRequest("Invalid Payload");
            }
            var events = await _ingredientsService.add(
                request.payload.body
            );
            const endMark = humanize.time();
            const elapsed =  endMark - startTime;
            response.payload = events;
            response.message = ` ${ events.records.count }(s) ${IngredientsRouter.name} [${elapsed} (ms)]`;
        } catch(err) {
            if(err instanceof InvalidRequest){
                response.message = err.message;
                res.statusCode = 400;//bad request
            }else{
                response.message = err || "error" ;
                res.statusCode = 500;//internal server error
            }
        }
        res.send(response);
    }

    public async update(req: Request, res: Response, next: NextFunction){
        const response = new IngredientsReponse();
        const request= new IngredientsRequest();
        request.payload.id = req.params.id;
        request.payload.body = req.body;
        response.payload = new IngredientsResponsePayload();
        var _ingredientsService = new IngredientsService(req['db']);
        const startTime = humanize.time();
        try{
            if(request.payload.body==null){
                throw new InvalidRequest("Invalid Payload");
            } else if(request.payload.id ==null){
                throw new InvalidRequest("Id must be valid");
            }

            var events = await _ingredientsService.update(
                request.payload.id,
                request.payload.body
            );
            const endMark = humanize.time();
            const elapsed =  endMark - startTime;
            response.payload = events;
            response.message = ` ${ events.records.count }(s) ${IngredientsRouter.name} [${elapsed} (ms)]`;
        } catch(err) {
            if(err instanceof InvalidRequest){
                response.message = err.message;
                res.statusCode = 400;//bad request
            }else{
                response.message = err || "error" ;
                res.statusCode = 500;//internal server error
            }
        }
        res.send(response);
    }

    public async delete(req: Request, res: Response, next: NextFunction){
        const response = new IngredientsReponse();
        const request= new IngredientsRequest();
        request.payload.id = req.params.id;
        response.payload = new IngredientsResponsePayload();
        var _ingredientsService = new IngredientsService(req['db']);
        const startTime = humanize.time();
        try{
            if(request.payload.id ==null){
                throw new InvalidRequest("Id must be valid");
            }
            var events = await _ingredientsService.delete(
                request.payload.id
            );
            const endMark = humanize.time();
            const elapsed =  endMark - startTime;
            response.payload = events;
            response.message = ` ${ events.records.count }(s) ${IngredientsRouter.name} [${elapsed} (ms)]`;
        } catch(err) {
            if(err instanceof InvalidRequest){
                response.message = err.message;
                res.statusCode = 400;//bad request
            }else{
                response.message = err || "error" ;
                res.statusCode = 500;//internal server error
            }
        }
        res.send(response);
    }

    public async byId(req: Request, res: Response, next: NextFunction){
        const response = new IngredientsReponse();
        const request= new IngredientsRequest();
        request.payload.id = req.params.id;
        response.payload = new IngredientsResponsePayload();
        var _ingredientsService = new IngredientsService(req['db']);
        const startTime = humanize.time();
        try{
            if(request.payload.id ==null){
                throw new InvalidRequest("Id must be valid");
            }
            var events = await _ingredientsService.byId(
                request.payload.id
            );
            const endMark = humanize.time();
            const elapsed =  endMark - startTime;
            response.payload = events;
            response.message = ` ${ events.records.count }(s) ${IngredientsRouter.name} [${elapsed} (ms)]`;
        } catch(err) {
            if(err instanceof InvalidRequest){
                response.message = err.message;
                res.statusCode = 400;//bad request
            }else{
                response.message = err || "error" ;
                res.statusCode = 500;//internal server error
            }
        }
        res.send(response);
    }

    init() {

        this.router.get('/', this.all);
        this.router.get('/count', this.count);
        this.router.get('/:id/get', this.byId);
        this.router.put('/add', this.add);
        this.router.post('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}

const ingredientsRouter = new IngredientsRouter();
ingredientsRouter.init();
export default ingredientsRouter.router;
