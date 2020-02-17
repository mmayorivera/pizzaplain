export class Product {
    _id: string;
    name: string;
    toppingsList: string;
    icons: any;
    toppingObjs: any[];
    /**
     * Constructor
     */
    constructor(pro?) {
        {
            pro = pro || {};
            this._id = pro._id || null;
            this.name = pro.name || '';
            this.toppingsList = pro.toppingsList || '';
            this.toppingObjs = pro.toppingObjs || [];
            this.icons = pro.icons || '';
        }
    }

}


