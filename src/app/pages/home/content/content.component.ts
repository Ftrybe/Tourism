import {Component, OnInit} from '@angular/core';
import {BannerService} from '../../../core/services/banner.service';
import {Topic} from '../../../core/models/topic';
import {SceneryService} from '../../../core/services/scenery.service';
import {FoodService} from '../../../core/services/food.service';
import {Food} from '../../../core/models/food';
import {Scenery} from '../../../core/models/scenery';
import {AjaxResponse} from '../../../core/models/ajax-response';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [BannerService]
})
export class HomeContentComponent implements OnInit {
  public banner: any;
  foods: Food[];
  sceneries: Scenery[];
  constructor(private bannerService: BannerService, private sceneryService: SceneryService, private foodService: FoodService) {
  }

  ngOnInit() {
    const data: Date = new Date();
    this.bannerService.getBanner(Topic.HOME).subscribe(
      (data) => {
        this.banner = data;
      }
    );
    this.listFoods();
    this.listScenery();
  }

  listFoods() {
    this.foodService.listOfHome().subscribe(
      (data: AjaxResponse<Food[]>) => {
        this.foods = data.data;
      }
    );
  }

  listScenery() {
    this.sceneryService.listOfHome().subscribe(
      (data: AjaxResponse<Scenery[]>) => {
        this.sceneries = data.data;
      }
    );

  }
}

