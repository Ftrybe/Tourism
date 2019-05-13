import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../core/services/users.service';
import {Note} from '../../../core/models/note';
import {NoteService} from '../../../core/services/note.service';
import {MatDialog} from '@angular/material';
import {ConfirmRequestDialogComponent} from '../../../dialog/confirm-request-dialog/confirm-request-dialog.component';

@Component({
  selector: 'app-user-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {

  notes: Note[] = null;

  constructor(private userService: UsersService, private noteService: NoteService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.userService.getPublish().subscribe(
      (list: Note[]) => {
        if (list) {
          this.notes = list;
        }
      }
    );
  }

  deleteNote(id) {
    const dialogRef = this.dialog.open(ConfirmRequestDialogComponent, {
      data: '确认删除？'
    });
    dialogRef.afterClosed().subscribe(
      state => {
        if (state) {
          this.noteService.delete(id).subscribe(
            () => {
              this.getList();
            }
          );
        }
      }
    );

  }
}
