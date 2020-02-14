import {IError} from './general';

export class InvalidRequest implements IError{
    constructor(message: string){
        this.message = message;
    }
    message: string;
}
