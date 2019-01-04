import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodComponent } from './food.component';
import { FoodRoutes } from './food.routing';
import { DetailedComponent } from './detailed/detailed.component';

@NgModule({
  imports: [
    CommonModule,
    FoodRoutes
  ],
  declarations: [FoodComponent, DetailedComponent]
})
export class FoodModule { }
