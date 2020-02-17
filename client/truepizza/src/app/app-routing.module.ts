import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ToppingsListComponent} from './pizza-app/toppings/list/toppings-list.component';
import {ToppingsService} from './pizza-app/toppings/toppings.service';
import {ProductsComponent} from './pizza-app/products/products.component';
import {ProductsService} from './pizza-app/products/products.service';



const routes: Routes = [
  { path: 'toppings',
    component: ToppingsListComponent,
    resolve  : {
      toppings: ToppingsService
    }
  },
  { path: 'pizzas',
    component: ProductsComponent,
    resolve  : {
      toppings: ProductsService
    }
  },
  { path: '', redirectTo: '/toppings', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
