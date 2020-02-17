import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ProductsService} from './products.service';
import {PizzaAnimations} from '../../core/animations';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {PizzaItemComponent} from './pizza-item/pizza-item.component';

@Component({
  selector: 'proboard',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: PizzaAnimations
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: any[];
  toppings: any[];
  nextPage: string;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _productsService: ProductsService,
    private _matSnackBar: MatSnackBar
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._productsService.onErrorOrSuccess
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(msg => {
          if (msg == null ) { return; }
          this._matSnackBar.open(msg, 'OK', {
            verticalPosition: 'top',
            duration        : 200
          });
        });


    this._productsService.onItemsChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(items => {
          this.products = items;
        });

    this._productsService.onToppingsChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(tops => {
          this.toppings = tops;
        });

    this._productsService.nextPageToken
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(nextToken => {
          this.nextPage = nextToken;
        });

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  AddNewProductPanel(): void {
    this._productsService.onItemChanged.next(null);
    this._bottomSheet.open(PizzaItemComponent);
  }

  EditNewProductPanel($event): void {
      this._productsService.getItem($event._id)
          .then((res) => {
              this._productsService.onItemChanged.next($event);
          })
          .catch((err) => {
              this._productsService.onErrorOrSuccess.next(err);
          });
      this._bottomSheet.open(PizzaItemComponent);
  }

  onNextPage(token: any): void {
    // this._productsService.showNextPage(token);
  }

}
