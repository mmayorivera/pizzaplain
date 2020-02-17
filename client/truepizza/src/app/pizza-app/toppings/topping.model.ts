import {IngredientIco} from '../../interfaces';

export class Topping {
    _id: string;
    name: string;
    ico: string;
    /**
     * Constructor
     *
     * @param top
     */
    constructor(top?) {
        {
            top = top || {};
            this._id = top._id || null;
            this.name = top.name || '';
            this.ico = top.ico || IngredientIco.basil;
        }
    }

}
