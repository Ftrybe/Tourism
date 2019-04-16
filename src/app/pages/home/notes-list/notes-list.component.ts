import {Component, OnInit} from '@angular/core';
import {NoteService} from '../../../core/services/note.service';
import {Note} from '../../../core/models/note';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  providers: [NoteService]
})
export class NotesListComponent implements OnInit {
<<<<<<< HEAD

  public notes: Note[];
=======
  public notes: Note[];
  public errorMsg;
>>>>>>> b58823c007b97bc0329aed6ec5fb4ccf79c25ffe

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
    this.noteService.getRandom().subscribe(data => this.notes = data);
  }

}
