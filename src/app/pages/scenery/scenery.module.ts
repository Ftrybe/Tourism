import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneryComponent } from './scenery.component';
import { SceneryRoutes } from './scenery.routing';
import {DetailedComponent} from './detailed/detailed.component';
import {ShareModule} from '../../share.module';
import {BaiduMapModule} from 'angular2-baidu-map';


@NgModule({
  imports: [
    CommonModule,
    SceneryRoutes,
    ShareModule,
    BaiduMapModule.forRoot({ak: '8F1HxkUfqSGRywCZYdEZqw4DGLX5glk2'})
  ],
  declarations: [
    SceneryComponent,
    DetailedComponent
  ]
})
export class SceneryModule { }
