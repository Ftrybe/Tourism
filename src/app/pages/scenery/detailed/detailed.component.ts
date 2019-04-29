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
  constructor(private previewDialog: FilePreviewOverlayService,
              private bannerService: BannerService,
              private sceneryService: SceneryService,
              private route: ActivatedRoute) {
    this.mapOptions = {
      centerAndZoom: {
        lat: 26.4896,
        lng: 119.5498,
        zoom: 16
      },
      enableKeyboard: true
    };
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
    this.markers = [
      {
        point: {
          lat: 26.4896,
          lng: 119.5498,
        }
      }
    ];
  }


  ngOnInit() {
    this.bannerService.getBanner(Topic.FOOD).subscribe(
      data => {
        this.banner = data;
      }
    );
    this.getDetailed();
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
}
