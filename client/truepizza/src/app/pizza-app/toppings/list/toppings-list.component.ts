import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ToppingsService} from '../toppings.service';
import {ToppingsItemComponent} from '../toppings-item/toppings-item.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {PizzaAnimations} from '../../../core/animations';

@Component({
  selector: 'topboard',
  templateUrl: './toppings-list.component.html',
  styleUrls: ['./toppings-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: PizzaAnimations
})
export class ToppingsListComponent implements OnInit, OnDestroy {

  toppings: any[];
  nextPage: string;
  // Private
  private _unsubscribeAll: Subject<any>;


  /**
   * Constructor
   *
   * @param _bottomSheet
   * @param _toppingsService
   * @param _matSnackBar
   */
  constructor(
    private _bottomSheet: MatBottomSheet,
    private _toppingsService: ToppingsService,
    private _matSnackBar: MatSnackBar
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // this._toppingsService.nextPageToken
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(nextToken => {
    //     this.nextPage = nextToken;
    //   });

    this._toppingsService.onItemsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(items => {
        this.toppings = items;
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
  AddNewToppingSheet(): void {
    this._toppingsService.onItemChanged.next(null);
    this._bottomSheet.open(ToppingsItemComponent);
  }

  EditNewToppingSheet($event): void {
    this._toppingsService.getItem($event._id)
      .then((res) => {
        this._toppingsService.onItemChanged.next(res);
      })
      .catch((err) => {
        this._toppingsService.onErrorOrSuccess.next(err);
      });

    this._bottomSheet.open(ToppingsItemComponent);
  }

  onNextPage(token: any): void {
    // this._toppingsService.showNextPage(token);
  }
}
