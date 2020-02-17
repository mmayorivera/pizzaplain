import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Subject} from 'rxjs';
import {ProductsService} from '../products.service';
import {Product} from '../product.model';
import {takeUntil} from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'products-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.scss']
})
export class PizzaItemComponent implements OnInit , OnDestroy {

  @Input()
  toppings: any[];

  topForm: FormGroup;
  product: Product;
  isDirty: boolean;
  pageType: string;
  selectedToppings: any[];
  toppingIcons: any[];

  private _unsubscribeAll: Subject<any>;

  constructor(
      private _formBuilder: FormBuilder,
      private _productsService: ProductsService,
      private _cdr: ChangeDetectorRef
  ) {
    this._unsubscribeAll = new Subject();
    this.product = new Product();
  }

  ngOnInit(): void {
    this._productsService.onItemChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(item => {
          if ( !_.isEmpty(item)  ) {
            this.product = new Product(item);
            this.pageType = 'edit';
            this.topForm = this.createProForm();
            // this._cdr.detectChanges();
          } else {
            this.product = new Product();
            this.pageType = 'new';
            this.topForm = this.createProForm();
          }
          this.isDirty = false;
          // this.cd.detectChanges();
        });
  }

  /**
   * Create topping form
   */
  createProForm(): FormGroup {
    const props = this.product.toppingsList.length > 0 ? this.product.toppingsList.split(',') : [];
    this.selectedToppings = [];
    props.forEach((prop: string) => {
      const txt = prop.toString();
      this.selectedToppings.push(txt);
    });

    this.toppingIcons = this.product.toppingObjs;
    return this._formBuilder.group({
      id             : [this.product._id],
      name           : [this.product.name, Validators.required],
      toppingsList   : [this.selectedToppings]
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

  selectionChanged($event: any): void {
    this.isDirty = true;
    this.toppingIcons = $event;
    console.log($event);
  }

  selectedToppingItems($event) {
    this._productsService.getListTopsByArray($event.toString()).then((list) => {
      this.toppingIcons = [...list];
      this._cdr.detectChanges();
    });

  }

  Save(): void {
    const data = this.topForm.getRawValue();
    data.toppingsList = data.toppingsList.toString();
    this._productsService.getListTopsByArray(data.toppingsList).then((list) => {
      data.toppingObjs = list;
      this._productsService.updateItem(data)
        .then((res) => {
          this._productsService.onErrorOrSuccess.next('Pizza Saved Sucessfully!!');
        }).catch(err => {
        this._productsService.onErrorOrSuccess.next(err.errors[0].message);
        console.log(err.errors[0].message);
      });
    });
  }

  Add(): void {
    const data = this.topForm.getRawValue();
    data.toppingsList = data.toppingsList.toString();
    this._productsService.getListTopsByArray(data.toppingsList).then((list) => {
        this._productsService.createItem(data)
          .then((res) => {
            this._productsService.onErrorOrSuccess.next('Pizza Created Sucessfully!!');
          }).catch(err => {
          this._productsService.onErrorOrSuccess.next(err.errors[0].message);
          console.log(err.errors[0].message);
        });
      });
  }

  Delete(pId: string): void {
    this._productsService.removeItem(pId)
        .then((res) => {
          this._productsService.onErrorOrSuccess.next('Pizza Deleted Sucessfully!!');
          this._productsService.onItemChanged.next({});
        }).catch(err => {
      this._productsService.onErrorOrSuccess.next(err.errors[0].message);
      console.log(err.errors[0].message);
    });
  }

}
