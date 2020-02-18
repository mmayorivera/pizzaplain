import {Injectable} from '@angular/core';
import * as _ from 'lodash';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {DataService} from '../data.service';

@Injectable()
export class ToppingsService implements Resolve<any> {

  onItemsChanged: BehaviorSubject<any>;
  onItemChanged: BehaviorSubject<any>;
  onSearchTextChanged: Subject<any>;
  onErrorOrSuccess: BehaviorSubject<any>;
  model: string = 'ingr';

  items: any[];
  pageSize: number;
  pageNo: number;

  constructor(
      private api: DataService
  ) {
    // Set the defaults
    this.onItemsChanged = new BehaviorSubject([]);
    this.onItemChanged = new BehaviorSubject({});
    this.onSearchTextChanged = new Subject();
    this.pageSize = 20;
    this.onErrorOrSuccess = new BehaviorSubject(null);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>[] | Promise<any> | any {
    return new Promise((resolve, reject) => {

      Promise.all([
        this.getList()
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
    let filter: any ;
    if (searchTxt !== undefined && !_.isEmpty(searchTxt) && searchTxt) {
      filter = searchTxt;
    } else {
      filter = null;
    }
    this.pageSize  = pageSize > 0 ? pageSize : 10;
    this.pageNo  = pageNo > 0 ? pageNo : 0;
    return new Promise((resolve, reject) => {
      this.api.all(this.pageNo, this.pageSize, this.model, filter)
          .subscribe((result) => {
              this.items = result.payload.records;
              this.onItemsChanged.next(this.items);
              resolve(this.items);
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
        ico: payload.ico
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
      ico: payload.ico
    };
    return new Promise((resolve, reject) => {
      this.api.update( payload.id , productInput, this.model)
          .subscribe((res) => {
            this.refresh();
            resolve(res);
          });
    });
  }

  removeItem(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.delete( id, this.model)
          .subscribe((res) => {
            this.refresh();
            resolve(res);
          });
    });
  }

}


