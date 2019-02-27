import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import {NotesRoutes, RoutingComponents} from './notes.routing';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NotesRoutes
  ],
  declarations: [RoutingComponents]
})
export class NotesModule { }
