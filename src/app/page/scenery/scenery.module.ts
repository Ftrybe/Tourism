import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneryComponent } from './scenery.component';
import { SceneryRoutes } from './scenery.routing';
import {DetailedComponent} from './detailed/detailed.component';
import {ShareModule} from '../../share.module';

@NgModule({
  imports: [
    CommonModule,
    SceneryRoutes,
    ShareModule
  ],
  declarations: [
    SceneryComponent,
    DetailedComponent
  ]
})
export class SceneryModule { }
