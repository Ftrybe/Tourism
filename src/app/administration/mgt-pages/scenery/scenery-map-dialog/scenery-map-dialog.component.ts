import {ChangeDetectorRef, Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ArticleMap} from '../../../../core/models/article-map';
import {Animation, BMarker, MapOptions, MarkerOptions, Point} from 'angular2-baidu-map';
import {ArticlesService} from '../../../../core/services/articles.service';
import {BaiduMapService} from '../../../../core/services/baidu-map.service';
import {BaiduMapResult, BaiduMapSuggestion} from '../../../../core/models/baidu-map-suggestion';

@Component({
  selector: 'app-article-map-dialog',
  templateUrl: './scenery-map-dialog.component.html',
  styleUrls: ['./scenery-map-dialog.component.scss']
})
export class SceneryMapDialogComponent implements OnInit {
  // 数据库获取地图信息
  map: ArticleMap = new ArticleMap();
  // 百度地图配置
  mapOptions: MapOptions;
  // 标记
  public markers: Array<{ point: Point; options?: MarkerOptions }>;
  address: any;
  options: BaiduMapResult[] = [];

  constructor(@Optional() private dialogRef: MatDialogRef<SceneryMapDialogComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public articleId: string,
              private articleService: ArticlesService,
              private changeRef: ChangeDetectorRef,
              private baiduService: BaiduMapService) {

  }

  ngOnInit() {
    this.map.lng = 119.556407;
    this.map.lat = 26.495357;
    this.initMap();
    this.articleService.getMap(this.articleId).subscribe(
      articleMap => {
        if (articleMap) {
          this.map = articleMap;
          this.initMap();
          //  this.changeRef.detectChanges();
        }
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

  clickMap(event) {
    this.map.lng = event.point.lng;
    this.map.lat = event.point.lat;
    this.getMarker();
    this.changeRef.detectChanges();
  }

  setAnimation(marker: BMarker): void {
    marker.setAnimation(Animation.BMAP_ANIMATION_BOUNCE);
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

  valueChange() {
    this.baiduService.getSuggestion(this.address).subscribe(
      data => {
        this.options = data.result;
      }
    );
  }

  setLocation(option: BaiduMapResult) {
    if (option.uid !== '') {
      this.map.lat = option.location.lat;
      this.map.lng = option.location.lng;
      this.initMap();
      this.changeRef.detectChanges();
    }
  }
}
