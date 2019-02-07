import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.scss']
})
export class ContentHeaderComponent implements OnInit {
  @Input() public icon: any;
  @Input() public title: any;
  @Input() public desc: any;
  @Input() public hideBreadcrumb: boolean = false;
  @Input() public hasBgImage: boolean = false;
  @Input() public class: any;

  constructor() {
  }

  ngOnInit() {
  }

}
