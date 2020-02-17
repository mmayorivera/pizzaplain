import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {ToppingsService} from './toppings.service';
import {Topping} from './topping.model';
import {of} from 'rxjs';

const PIZZA_TOPPINGS_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PizzaToppingsComponent),
  multi: true
};

@Component({
  selector: 'pizza-toppings',
  providers: [PIZZA_TOPPINGS_ACCESSOR],
  styleUrls: ['pizza-toppings.component.scss'],
  template: `
    <div class="pizza-toppings">
      <label
        *ngFor="let topping of toppings"
        class="pizza-topping"
        [class.pizza-topping--active]="value.includes(topping._id)"
        [class.pizza-topping--focused]="focused === topping._id">
        <input
          type="checkbox"
          [attr.name]="topping.name"
          [attr.value]="topping._id"
          (blur)="onBlur(topping._id)"
          (change)="updateTopping(topping._id)"
          (focus)="onFocus(topping._id)"
          [checked]="value.includes(topping._id)">
        <span class="pizza-topping__icon pizza-topping__icon--{{ topping.ico }}"></span>
        {{ topping.name  }}
      </label>
    </div>
  `
})
export class PizzaToppingsComponent implements ControlValueAccessor, OnInit  {

  toppings: Topping[];
  focused: string;
  private onTouch: Function = (_: any) => {};
  private onModelChange: Function = (_: any) => {};

  @Input()
  value: string[];

  @Output()
  selectedToppingsItems = new EventEmitter<any>();

  constructor(
    private _toppingsService: ToppingsService,
  ) {
    this.value = [];
    of(this._toppingsService.refresh());
  }

  ngOnInit(): void {
    this._toppingsService.onItemsChanged
      .subscribe(items => {
        this.toppings = [...items];
      });
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  writeValue(value) {
    this.value = value;
  }

  updateTopping(topping: string) {
    if (this.value.includes(topping)) {
      this.value = this.value.filter((x: string) => topping !== x);
    } else {
      this.value = this.value.concat([topping]);
    }
    this.selectedToppingsItems.emit(this.value);
    this.onModelChange(this.value);
  }

  onBlur(value: string) {
    this.focused = '';
  }

  onFocus(value: string) {
    this.focused = value;
    this.onTouch();
  }
}
