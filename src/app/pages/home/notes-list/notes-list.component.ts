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

  public isShowMenu: boolean;
  public notes: Note[];
  public errorMsg;

  getSortMenu(envent) {
    this.isShowMenu = true;
  }

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
    this.noteService.getRandom().subscribe(data => this.notes = data);
  }

}
