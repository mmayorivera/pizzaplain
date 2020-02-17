import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {DataService} from '../data.service';



@Injectable()
export class ProductsService implements Resolve<any> {

  onItemsChanged: BehaviorSubject<any>;
  onToppingsChanged: BehaviorSubject<any>;
  onItemChanged: BehaviorSubject<any>;
  nextPageToken: BehaviorSubject<any>;
  onSearchTextChanged: Subject<any>;
  onErrorOrSuccess: BehaviorSubject<any>;
  model = 'pizza';

  items: any[];
  toppings: any[];
  pageSize: number;
  nextToken: string;
  pageNo: number;

  constructor(
      private api: DataService
  ) {
    // Set the defaults
    this.onItemsChanged = new BehaviorSubject([]);
    this.onToppingsChanged = new BehaviorSubject([]);
    this.onItemChanged = new BehaviorSubject({});
    this.onSearchTextChanged = new Subject();
    this.pageSize = 10;
    this.nextToken = null;
    this.nextPageToken = new BehaviorSubject(this.nextToken);
    this.onErrorOrSuccess = new BehaviorSubject(null);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>[] | Promise<any> | any {
    return new Promise((resolve, reject) => {

      Promise.all([
        this.getList(),
        this.getListTops()
      ]).then(
          ([items]) => {
              this.onSearchTextChanged.subscribe(searchText => {
                  of(this.getList(searchText));
              });
              resolve();
          },
          reject
      );
    });
  }

  refresh(): void {
      of(this.getList());
  }

  getList(searchTxt?: string, pageSize?: number, pageNo?: number): Promise<any> {
    let filter: any;
    if (searchTxt !== undefined && !_.isEmpty(searchTxt) && searchTxt) {
      filter = {
        name: { contains: searchTxt}
      };
    } else {
        filter = null;
    }
    this.pageSize  = pageSize > 0 ? pageSize : 10;
    this.pageNo  = pageNo > 0 ? pageNo : 0;
    return new Promise((resolve, reject) => {
      this.api.all(this.pageNo, this.pageSize, this.model)
          .subscribe((result) => {
            const results = result.payload.records.map(item => {
                item.toppingObjs = JSON.parse(item.toppingObjs);
                return item;
            });
            this.items = results;
            this.onItemsChanged.next(this.items);
            resolve(this.items);
          });
    });
  }

  getListTops(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.api.all(0, 100, 'ingr')
            .subscribe((result) => {
                this.toppings = result.payload.records;
                this.onToppingsChanged.next(this.toppings);
                resolve(this.toppings);
            });
    });
  }

  getListTopsByArray(idList: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.in(idList, 'ingr')
        .subscribe((result) => {
          const toppings = result.payload.records;
          resolve(toppings);
        });
    });
  }

  getItem(id: any): Promise<any> {
      return new Promise((resolve, reject) => {
        this.api.getById(id, this.model)
            .subscribe((res) => {
              const found = res.payload.records.found;
              this.onItemChanged.next(found);
              resolve(found);
            });
      });
  }

  createItem(payload: any): Promise<any> {
    const productInput: any = {
        name: payload.name,
        toppingsList: payload.toppingsList,
        toppingObjs: JSON.stringify(payload.toppingObjs)
    };
    return new Promise((resolve, reject) => {
      this.api.create( productInput, this.model)
          .subscribe((res) => {
            this.refresh();
            resolve(res);
          });
    });
  }

  updateItem(payload: any): Promise<any> {
    const productInput: any = {
      name: payload.name,
      toppingsList: payload.toppingsList,
      toppingObjs: JSON.stringify(payload.toppingObjs)
    };
    return new Promise((resolve, reject) => {
      this.api.update( payload.id, productInput, this.model)
          .subscribe((res) => {
            this.refresh();
            resolve(res);
          });
    });
  }

  removeItem(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.delete( id, this.model)
          .subscribe((res) => {
            this.refresh();
            resolve(res);
          })
    });
  }
}


