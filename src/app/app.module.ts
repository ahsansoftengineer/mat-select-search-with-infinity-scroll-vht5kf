import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { SelectComponent } from './select/select.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MatSelectInfiniteScrollModule} from 'ng-mat-select-infinite-scroll';


@NgModule({
  imports: [ 
    BrowserModule, 
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    MatSelectModule, 
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatSelectInfiniteScrollModule
  ],
  exports: [
    
  ],
  declarations: [ AppComponent, SelectComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
