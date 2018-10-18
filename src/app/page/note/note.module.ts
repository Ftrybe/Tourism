import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note.component';
import { NoteRoutes } from './note.routing';

@NgModule({
  imports: [
    CommonModule,
    NoteRoutes
  ],
  declarations: [NoteComponent]
})
export class NoteModule { }
