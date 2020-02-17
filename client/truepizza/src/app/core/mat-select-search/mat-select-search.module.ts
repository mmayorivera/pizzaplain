import { NgModule } from '@angular/core';
import { MatSelectSearchComponent } from './mat-select-search.component';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule
    ],
    declarations: [
        MatSelectSearchComponent
    ],
    exports: [
        MatButtonModule,
        MatInputModule,
        MatSelectSearchComponent
    ]
})
export class MatSelectSearchModule { }