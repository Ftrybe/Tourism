import {Component, OnInit} from '@angular/core';
import {NoteService} from '../../../core/services/note.service';
import {Note} from '../../../core/models/note';
import {MatDialog, MatDialogRef} from '@angular/material';
import {NoteDialogComponent} from './note-dialog/note-dialog.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  showSearch: boolean;
  searchText: any;
  public notes: Note[];
  displayedColumns = ['title', 'username', 'ops'];

  constructor(private noteService: NoteService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.noteService.getList('1').subscribe(
      (data) => {
        if (data) {
          this.notes = data;
          console.log(this.notes);
        }
      }
    );
  }

  openUserDialog(param) {

  }

  delete(id: any) {

  }

  openDialog(element: any) {
    this.dialog.open(NoteDialogComponent, {});
  }
}
