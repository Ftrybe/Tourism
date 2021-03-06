import {Component, OnInit} from '@angular/core';
import {SceneryService} from '../../core/services/scenery.service';
import {Scenery} from '../../core/models/scenery';

@Component({
  selector: 'app-scenery',
  templateUrl: './scenery.component.html',
  styleUrls: ['./scenery.component.scss']
})
export class SceneryComponent implements OnInit {
  sceneries: Scenery[] = [];
  constructor(private sceneryService: SceneryService) { }

  ngOnInit() {
    this.getList();
  }
  getList(){
    this.sceneryService.list().subscribe(
      data => {
        this.sceneries = data;
      }
    );
  }
}
