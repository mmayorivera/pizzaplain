import {ApiRequest, ApiResponse} from "./general";

export class IngredientsRequestPayload {
    page:number;
    limit:number;
    id:string;
    name:string;
    ico:string;
    body: any;
    idList: any;
    txt: any;
}
export class IngredientsResponsePayload {
    body:string;
}

export class IngredientsRequest extends ApiRequest{
    constructor(){
        super();
        this.payload = new IngredientsRequestPayload();
    }
    payload: IngredientsRequestPayload;
}

export class IngredientsReponse extends ApiResponse{
    constructor(){
        super();
        this.payload = new IngredientsResponsePayload();
    }
    payload: IngredientsResponsePayload;
}
