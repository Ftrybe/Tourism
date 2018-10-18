import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneryComponent } from './scenery.component';
import { SceneryRoutes } from './scenery.routing';

@NgModule({
  imports: [
    CommonModule,
    SceneryRoutes
  ],
  declarations: [SceneryComponent]
})
export class SceneryModule { }
