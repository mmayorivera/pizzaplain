import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Topping} from '../topping.model';
import {ReplaySubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import * as _ from 'lodash';
import {IngredientIco} from '../../../interfaces';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {ToppingsService} from '../toppings.service';
interface TopIcon {
  value: string;
  name: string;
}

@Component({
  selector: 'app-toppings-item',
  templateUrl: './toppings-item.component.html',
  styleUrls: ['./toppings-item.component.scss']
})
export class ToppingsItemComponent implements OnInit , OnDestroy {


  topForm: FormGroup;
  topping: Topping;
  private unsubscribeAll: Subject<any>;

  IconOptions: TopIcon[];

  public iconFilterCtrl: FormControl = new FormControl();
  public filteredIconProducts: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  pageType: string;


  constructor(
      private _formBuilder: FormBuilder,
      private _toppingsService: ToppingsService,
      private _bottomSheetRef: MatBottomSheetRef<ToppingsItemComponent>
  ) {

    this.unsubscribeAll = new Subject();
    this.topping = new Topping();
    this.IconOptions = [];
    for (const ingredientIcoKey in IngredientIco) {
        this.IconOptions.push(
            { value: ingredientIcoKey.toString(),
              name: ingredientIcoKey.toString()
            });
    }
    this.filteredIconProducts.next(this.IconOptions.slice());
  }

  ngOnInit(): void {

    this.iconFilterCtrl.valueChanges
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe(() => {
          this._filterIcons();
        });

    this._toppingsService.onItemChanged
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe(item => {
          if ( !_.isEmpty(item)  ) {

            this.topping = new Topping(item);
            this.pageType = 'edit';
            this.topForm = this.createTopForm();
          } else {
            this.topping = new Topping();
            this.pageType = 'new';
            this.topForm = this.createTopForm();
            this.topForm.controls.ico.setValue( this.IconOptions[0].value);
          }
        });
  }

  /**
   * Create topping form
   *
   * @returns {FormGroup}
   */
  createTopForm(): FormGroup {
    return this._formBuilder.group({
      id             : [this.topping._id],
      name           : [this.topping.name, Validators.required],
      ico            : [this.topping.ico,  Validators.required],
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  Save(): void {
    const data = this.topForm.getRawValue();
    this._toppingsService.updateItem(data)
        .then((res) => {
          this._toppingsService.onErrorOrSuccess.next('Topping Saved Sucessfully!!');
        }).catch(err => {
          this._toppingsService.onErrorOrSuccess.next(err.errors[0].message);
          console.log(err.errors[0].message);
    });
    this._bottomSheetRef.dismiss();
  }

  Add(): void {
    const data = this.topForm.getRawValue();
    this._toppingsService.createItem(data)
        .then((res) => {
          this._toppingsService.onErrorOrSuccess.next('Topping Created Sucessfully!!');
        }).catch(err => {
      this._toppingsService.onErrorOrSuccess.next(err.errors[0].message);
      console.log(err.errors[0].message);
    });
    this._bottomSheetRef.dismiss();
  }

  Delete(id: any): void {
    this._toppingsService.removeItem(id)
        .then((res) => {
          this._toppingsService.onErrorOrSuccess.next('Topping Created Sucessfully!!');
        }).catch(err => {
      this._toppingsService.onErrorOrSuccess.next(err.errors[0].message);
      console.log(err.errors[0].message);
    });
    this._bottomSheetRef.dismiss();
  }

  Cancel(): void {
    this._toppingsService.onErrorOrSuccess.next('Sounds Good!! Thanks');
    this._bottomSheetRef.dismiss();
  }


  private _filterIcons(): void {
    if (!this.IconOptions) {
      return;
    }
    // get the search keyword
    let search = this.iconFilterCtrl.value;
    if (!search) {
      this.filteredIconProducts.next(this.IconOptions.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredIconProducts.next(
        this.IconOptions.filter(lang => lang.name.toLowerCase().indexOf(search) > -1)
    );
  }
}
