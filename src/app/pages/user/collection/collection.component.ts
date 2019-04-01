import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../../../core/services/users.service';
import {HotService} from '../../../core/services/hot.service';
import {User} from '../../../core/models/user';

@Component({
  selector: 'app-user-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  @Input() private user: User;
  constructor(private hotService: HotService) { }

  ngOnInit() {

  }
  getList(){

  }
}
