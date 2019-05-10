import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ErrorRoutes} from './error.routing';

@NgModule({
  imports: [
    CommonModule,
    ErrorRoutes
  ],
  declarations: [PageNotFoundComponent]
})
export class ErrorModule { }
