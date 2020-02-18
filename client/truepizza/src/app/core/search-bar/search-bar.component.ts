import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ProductsService} from '../../pizza-app/products/products.service';
import {ToppingsService} from '../../pizza-app/toppings/toppings.service';
import * as _ from 'lodash';

@Component({
    selector   : 'search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls  : ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
    value: any;

    @ViewChild('filter', {static: true})
    filter: ElementRef;


    @Output()
    input: EventEmitter<any>;


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     */
    constructor(
      private router: Router,
      private _productsService: ProductsService,
      private _toppingsService: ToppingsService
    ) {
        // Set the defaults
        this.input = new EventEmitter();
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
      fromEvent(this.filter.nativeElement, 'keyup')
        .pipe(
          debounceTime(550),
          distinctUntilChanged()
        )
        .subscribe(() => {
          const filter = this.filter.nativeElement.value;
          this.filterNow(filter);
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
    OnClear(): void {
      this.filter.nativeElement.value = '';
      this.filterNow(null);
    }

    filterNow(txt: string): void  {
      if (this.router.url.indexOf('/pizzas') === 0) {
        this._productsService.onSearchTextChanged.next(txt);
      }
      if (this.router.url.indexOf('/toppings') === 0) {
        this._toppingsService.onSearchTextChanged.next(txt);
      }
    }


}
