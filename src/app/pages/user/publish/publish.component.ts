import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../core/services/users.service';
import {Note} from '../../../core/models/note';
import {NoteService} from '../../../core/services/note.service';
import {MatDialog, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {

  notes: Note[];

  constructor(private userService: UsersService, private noteService: NoteService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userService.getPublish().subscribe(
      (list: Note[]) => {
        if (list) {
          this.notes = list;
        }
      }
    );
  }

  deleteNote(id) {
    this.noteService.delete(id).subscribe(
      state => {
        console.log(state);
      }
    );
  }
}
