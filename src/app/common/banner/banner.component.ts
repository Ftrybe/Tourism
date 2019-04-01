import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Banner} from '../../core/models/banner';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnChanges {

  @Input() isSubBanner: boolean;
  // @Input() imgSrc: String;
  @Input('banner') banner: any;
  b: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.banner) {
      this.b = this.banner;
    }
  }

}
