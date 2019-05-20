import {Component, OnInit} from '@angular/core';
import {NoteService} from '../../../core/services/note.service';
import {Note} from '../../../core/models/note';
import {MatDialog, MatDialogRef, PageEvent} from '@angular/material';
import {NoteDialogComponent} from './note-dialog/note-dialog.component';
import {AjaxResponse} from '../../../core/models/ajax-response';
import {PageHelper} from '../../../core/models/page-helper';
import {ConfirmRequestDialogComponent} from '../../../dialog/confirm-request-dialog/confirm-request-dialog.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  showSearch: boolean;
  searchText: any;
  public notes: Note[];
  pageInfo: PageHelper<Note>;
  displayedColumns = ['title', 'username', 'ops'];

  constructor(private noteService: NoteService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getList(1);
  }

  getList(pageNum) {
    this.noteService.getList(pageNum).subscribe(
      (data: AjaxResponse<PageHelper<Note>>) => {
        if (data) {
          this.pageInfo = data.data;
          this.notes = data.data.list;
        }
      }
    );
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmRequestDialogComponent, {
      data: '确认删除该用户游记？'
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.noteService.delete(id).subscribe(
            d => {
              this.getList(this.pageInfo.pageNum);
            }
          );
        }
      }
    );
  }

  openDialog(element: any) {
    this.dialog.open(NoteDialogComponent, {
      width: '1278px',
      data: element
    });
  }

  onPageChange(event: PageEvent) {
   this.getList(event.pageIndex + 1);
  }
}
