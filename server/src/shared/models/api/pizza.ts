import {ApiRequest, ApiResponse} from "./general";

export class PizzaRequestPayload {
    page:number;
    limit:number;
    id:string;
    name:string;
    ico:string;
    body: any;
}
export class PizzaResponsePayload {
    body:string;
}

export class PizzaRequest extends ApiRequest{
    constructor(){
        super();
        this.payload = new PizzaRequestPayload();
    }
    payload: PizzaRequestPayload;
}

export class PizzaReponse extends ApiResponse{
    constructor(){
        super();
        this.payload = new PizzaResponsePayload();
    }
    payload: PizzaResponsePayload;
}
