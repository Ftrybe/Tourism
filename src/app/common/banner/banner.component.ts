import {Component, Input, OnInit} from '@angular/core';

@Component ({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() isSubBanner: boolean;
  @Input() imgSrc: String;
  constructor() {
  }

  ngOnInit() {
  }

}
