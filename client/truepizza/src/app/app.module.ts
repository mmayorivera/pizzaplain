import { BrowserModule } from '@angular/platform-browser';
import {DEFAULT_CURRENCY_CODE, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {ToppingsItemComponent} from './pizza-app/toppings/toppings-item/toppings-item.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatSelectSearchModule} from './core/mat-select-search/mat-select-search.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ToppingsListComponent} from './pizza-app/toppings/list/toppings-list.component';
import {ProductsDisplayComponent} from './pizza-app/products/products-display/products-display.component';
import {ProductsComponent} from './pizza-app/products/products.component';
import {DataService} from './pizza-app/data.service';
import {ToppingsService} from './pizza-app/toppings/toppings.service';
import {ProductsService} from './pizza-app/products/products.service';
import {PizzaItemComponent} from './pizza-app/products/pizza-item/pizza-item.component';
import {PizzaToppingsComponent} from './pizza-app/toppings/pizza-toppings.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    ToppingsItemComponent,
    ToppingsListComponent,
    ProductsComponent,
    ProductsDisplayComponent,
    PizzaItemComponent,
    PizzaToppingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule,
    MatTabsModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSelectSearchModule,
    MatSnackBarModule
  ],
  exports: [
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule,
    MatTabsModule,
    MatSidenavModule
  ],
  entryComponents: [ToppingsItemComponent, PizzaItemComponent],
  providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: [] },
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'},
    DataService, ToppingsService, ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
