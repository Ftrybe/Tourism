import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../core/models/user';
import {MatDialog} from '@angular/material';
import {ConfirmRequestDialogComponent} from '../../../dialog/confirm-request-dialog/confirm-request-dialog.component';
import {NoteCollectionService} from '../../../core/services/note-collection.service';
import {NoteCollection} from '../../../core/models/note-collection';

@Component({
  selector: 'app-user-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  @Input() private user: User;
  collection: NoteCollection[];

  constructor(private collectionService: NoteCollectionService, private dialog: MatDialog) {
  }


  ngOnInit() {
    this.getList(1);
  }

  openDialog(id) {
    const dialogRef = this.dialog.open(ConfirmRequestDialogComponent, {
      data: '确定取消收藏？'
    });
    dialogRef.afterClosed().subscribe(
      state => {
        if (state) {
          console.log(state);
          this.closeCollection(id);
        }
      }
    );
  }

  closeCollection(id) {
    this.collectionService.closeCollection(id).subscribe();
  }

  getList(page) {
    this.collectionService.list(page).subscribe(
      data => {
        this.collection = data;
      }
    );
  }
}
