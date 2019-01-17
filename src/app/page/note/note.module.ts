import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoteComponent} from './note.component';
import {NoteRoutes} from './note.routing';
import {ShareModule} from '../../share.module';
import {MatCardModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    NoteRoutes,
    ShareModule,
    MatCardModule
  ],
  declarations: [NoteComponent]
})
export class NoteModule { }
