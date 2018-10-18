import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scenery',
  templateUrl: './scenery.component.html',
  styleUrls: ['./scenery.component.css']
})
export class SceneryComponent implements OnInit {

  private mmmmm;
  constructor() { }

  ngOnInit() {
    this.mmmmm = '嘿嘿';
  }

}
