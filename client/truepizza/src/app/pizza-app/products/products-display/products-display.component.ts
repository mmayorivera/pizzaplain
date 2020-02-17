import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

export const DROP_ANIMATION = trigger('drop', [
  transition(':enter', [
    style({ transform: 'translateY(-200px)', opacity: 0 }),
    animate(
        '300ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
        style({ transform: 'translateY(0)', opacity: 1 })
    ),
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)', opacity: 1 }),
    animate(
        '200ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
        style({ transform: 'translateY(-200px)', opacity: 0 })
    ),
  ]),
]);

@Component({
  selector: 'products-display',
  animations: [DROP_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['products-display.component.scss'],
  template: `
    <div class="pizza-display">
      <div class="pizza-display__base">
        <img src="/assets/pizza.svg">
        <img
          *ngFor="let topping of toppingList; index as i;"
          src="/assets/toppings/{{ topping.ico }}.svg"
          [style.zIndex]="i"
          class="pizza-display__topping"
          @drop>
      </div>
    </div>
  `,
})
export class ProductsDisplayComponent {
  @Input() toppingList: any[];
}
