import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodComponent } from './food.component';
import { FoodRoutes } from './food.routing';

@NgModule({
  imports: [
    CommonModule,
    FoodRoutes
  
  ],
  declarations: [FoodComponent]
})
export class FoodModule { }
