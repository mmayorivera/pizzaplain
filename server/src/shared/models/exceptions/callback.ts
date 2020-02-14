import {IError} from './general';

export class InvalidCallbackRequest implements IError{
    constructor(message: string){
        this.message = message;
    }
    message: string;
}
