import {Component, OnInit} from '@angular/core';
import {BannerService} from '../../../core/services/banner.service';
import {Topic} from '../../../core/models/topic';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [BannerService]
})
export class HomeContentComponent implements OnInit {
  public banner: any;

  constructor(private banerService: BannerService) {
  }

  ngOnInit() {
    const data: Date = new Date();
    this.banerService.getBanner(Topic.HOME).subscribe(
      (data) => {
        this.banner = data;
      }
    );

  }
}
