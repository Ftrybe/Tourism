import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutes, RoutingComponents} from './admin.routing';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutes,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [RoutingComponents]
})
export class AdminModule { }
