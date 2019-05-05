import {Component, OnInit} from '@angular/core';
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
import {FilePreviewOverlayService} from '../../../common/file-preview-overlay/file-preview-overlay.service';
import {BannerService} from '../../../core/services/banner.service';
import {Topic} from '../../../core/models/topic';
import {FilePreviewOverlayRef} from '../../../common/file-preview-overlay/file-preview-overlay-ref';
import {SceneryService} from '../../../core/services/scenery.service';
import {ActivatedRoute} from '@angular/router';
import {Scenery} from '../../../core/models/scenery';
import {ArticleMap} from '../../../core/models/article-map';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent implements OnInit {

  mapOptions: MapOptions;
  public markers: Array<{ point: Point; options?: MarkerOptions }>;
  controlOpts: NavigationControlOptions;
  geolocationOpts: GeolocationControlOptions;
  banner: any;
  scenery: Scenery;
  map: ArticleMap = new ArticleMap();

  constructor(private previewDialog: FilePreviewOverlayService,
              private bannerService: BannerService,
              private sceneryService: SceneryService,
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
    this.map.lng = 119.556407;
    this.map.lat = 26.495357;
    this.initMap();
    this.bannerService.getBanner(Topic.SCRENERY).subscribe(
      data => {
        this.banner = data;
      }
    );
    this.getDetailed();
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
  public setAnimation(marker: BMarker): void {
    marker.setAnimation(Animation.BMAP_ANIMATION_BOUNCE);
  }

  public showWindow({marker, map}: { marker: BMarker; map: BMapInstance }): void {
    map.openInfoWindow(
      new window.BMap.InfoWindow('地址：浦东南路360号', {
        offset: new window.BMap.Size(0, -30),
        title: '新上海国际大厦'
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
        this.scenery = data[0];
      }
    );
  }

  getMap() {
    this.sceneryService.getMap(this.scenery.id).subscribe(data => {
      this.map = data;
      console.log(data);
    });
  }
}
