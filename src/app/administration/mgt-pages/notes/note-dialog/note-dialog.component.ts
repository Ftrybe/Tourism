import {Component, Inject, OnInit} from '@angular/core';
import {Note} from '../../../../core/models/note';
import {NoteService} from '../../../../core/services/note.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ɵDomAdapter} from '@angular/platform-browser';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss']
})
export class NoteDialogComponent implements OnInit {
 // note: Note = null;
  constructor(
    private dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private note: Note,
    private noteService: NoteService) { }

  ngOnInit() {
   /* this.noteService.getNote(this.id).subscribe(
      data => {
        console.log(data);
        this.note = data;
      }
    );*/
  }

}
