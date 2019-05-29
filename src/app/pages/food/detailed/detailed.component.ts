import {Component, OnInit} from '@angular/core';
import {FilePreviewOverlayService} from '../../../common/file-preview-overlay/file-preview-overlay.service';
import {FilePreviewOverlayRef} from '../../../common/file-preview-overlay/file-preview-overlay-ref';
import {
  Animation,
  BMapInstance,
  BMarker,
  ControlAnchor,
  GeolocationControlOptions,
  MapOptions,
  MarkerOptions,
  NavigationControlOptions,
  NavigationControlType,
  Point
} from 'angular2-baidu-map';
import {BannerService} from '../../../core/services/banner.service';
import {Topic} from '../../../core/models/topic';
import {ActivatedRoute} from '@angular/router';
import {Food} from '../../../core/models/food';
import {ArticleMap} from '../../../core/models/article-map';
import {FoodService} from '../../../core/services/food.service';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent implements OnInit {
  mapOptions: MapOptions;
  food: Food;
  public markers: Array<{ point: Point; options?: MarkerOptions }>;
  controlOpts: NavigationControlOptions;
  geolocationOpts: GeolocationControlOptions;
  banner: any;
  map: ArticleMap;

  constructor(
    private previewDialog: FilePreviewOverlayService,
    private bannerService: BannerService,
    private foodService: FoodService,
    private route: ActivatedRoute) {
    this.controlOpts = {
      anchor: ControlAnchor.BMAP_ANCHOR_TOP_LEFT,      // 显示的控件的位置
      type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE,   // 用来描述它是什么样的导航
      offset: {                                        // 控件的大小
        width: 30,
        height: 30
      },
      showZoomInfo: true,                             // 是否展示当前的信息
      enableGeolocation: true                         // 是否启用地理定位功能
    };
  }


  ngOnInit() {
    this.getDetailed();
    this.getMap();
    this.bannerService.getBanner(Topic.FOOD).subscribe(
      data => {
        this.banner = data;
      }
    );
  }

  public setAnimation(marker: BMarker): void {
    marker.setAnimation(Animation.BMAP_ANIMATION_BOUNCE);
  }

  public showWindow({marker, map}: { marker: BMarker; map: BMapInstance }): void {
    map.openInfoWindow(
      new window.BMap.InfoWindow(this.map.address, {
        offset: new window.BMap.Size(0, -30),
        title: this.map.title
      }),
      marker.getPosition()
    );
  }

  showPreview() {
    const dialogRef: FilePreviewOverlayRef = this.previewDialog.open({});
  }
  getDetailed() {
    this.route.data.subscribe(
      (data) => {
        this.food = data[0];
      }
    );
  }
  initMap() {
    this.mapOptions = {
      centerAndZoom: {
        lat: this.map.lat,
        lng: this.map.lng,
        zoom: 14
      },
      enableKeyboard: true,
      enableScrollWheelZoom: true
    };
    this.getMarker();
  }

  getMarker() {
    this.markers = [
      {
        point: {
          lat: this.map.lat,
          lng: this.map.lng,
        }
      }
    ];
  }
  getMap() {
    this.foodService.getMap(this.food.id).subscribe((data: ArticleMap) => {
      if (data) {
        this.map = new ArticleMap();
        this.map = data;
      } else {
        this.defaultMapOpts();
      }
      this.initMap();
    });
  }

  defaultMapOpts() {
    this.map = new ArticleMap();
    this.map.lng = 119.556407;
    this.map.lat = 26.495357;
    this.map.title = '管理员未设置，请联系管理员';
    this.map.address = '管理员未设置，请联系管理员';
  }

}
