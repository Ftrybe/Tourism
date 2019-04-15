import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../core/models/user';
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

  constructor(private collectionService: NoteCollectionService) {
  }

  ngOnInit() {
    this.getList(1);
  }

  getList(page) {
    this.collectionService.list(page).subscribe(
      data => {
        this.collection = data;
      }
    );
  }
}
