import {Component, Inject, OnInit} from '@angular/core';
import {Note} from '../../../../core/models/note';
import {NoteService} from '../../../../core/services/note.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss']
})
export class NoteDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public note: Note,
    private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.getNote(this.note.id).subscribe(
      data => {
        this.note = data;
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
