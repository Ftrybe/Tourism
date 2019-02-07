import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodComponent } from './food.component';
import { FoodRoutes } from './food.routing';
import { DetailedComponent } from './detailed/detailed.component';
import {ShareModule} from '../../share.module';

@NgModule({
  imports: [
    CommonModule,
    FoodRoutes,
    ShareModule
  ],
  declarations: [FoodComponent, DetailedComponent]
})
export class FoodModule { }
