import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../../../core/services/users.service';
import {HotService} from '../../../core/services/hot.service';
import {User} from '../../../core/models/user';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmRequestDialogComponent} from '../../../dialog/confirm-request-dialog/confirm-request-dialog.component';
import {NoteCollectionService} from '../../../core/services/note-collection.service';

@Component({
  selector: 'app-user-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  @Input() private user: User;

  constructor(private collectionService: NoteCollectionService, private dialog: MatDialog) {
  }

  ngOnInit() {

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

  list() {
    this.collectionService.getList().subscribe();
  }
}
