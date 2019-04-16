import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../core/models/user';
<<<<<<< HEAD
import {MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmRequestDialogComponent} from '../../../dialog/confirm-request-dialog/confirm-request-dialog.component';
import {NoteCollectionService} from '../../../core/services/note-collection.service';
=======
import {NoteCollectionService} from '../../../core/services/note-collection.service';
import {NoteCollection} from '../../../core/models/note-collection';
>>>>>>> b58823c007b97bc0329aed6ec5fb4ccf79c25ffe

@Component({
  selector: 'app-user-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  @Input() private user: User;
<<<<<<< HEAD

  constructor(private collectionService: NoteCollectionService, private dialog: MatDialog) {
  }
=======
  collection: NoteCollection[];
>>>>>>> b58823c007b97bc0329aed6ec5fb4ccf79c25ffe

  constructor(private collectionService: NoteCollectionService) {
  }

  ngOnInit() {
    this.getList(1);
  }

<<<<<<< HEAD
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

  list() {
    this.collectionService.getList().subscribe();
=======
  getList(page) {
    this.collectionService.list(page).subscribe(
      data => {
        this.collection = data;
      }
    );
>>>>>>> b58823c007b97bc0329aed6ec5fb4ccf79c25ffe
  }
}
