import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodComponent } from './food.component';
import { FoodRoutes } from './food.routing';
import { DetailedComponent } from './detailed/detailed.component';
import {ShareModule} from '../../share.module';
import {BaiduMapModule} from 'angular2-baidu-map';

@NgModule({
  imports: [
    CommonModule,
    FoodRoutes,
    ShareModule,
    BaiduMapModule.forRoot({ak: '8F1HxkUfqSGRywCZYdEZqw4DGLX5glk2'})
  ],
  declarations: [FoodComponent, DetailedComponent]
})
export class FoodModule { }
