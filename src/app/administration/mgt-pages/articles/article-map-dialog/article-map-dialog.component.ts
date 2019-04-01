import {ChangeDetectorRef, Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ArticleMap} from '../../../../core/models/article-map';
import {Animation, BMarker, MapOptions, MarkerOptions, Point} from 'angular2-baidu-map';
import {ArticlesService} from '../../../../core/services/articles.service';
import {a} from '@angular/core/src/render3';

@Component({
  selector: 'app-article-map-dialog',
  templateUrl: './article-map-dialog.component.html',
  styleUrls: ['./article-map-dialog.component.scss']
})
export class ArticleMapDialogComponent implements OnInit {
  // 数据库获取地图信息
  map: ArticleMap = new ArticleMap();
  // 百度地图配置
  mapOptions: MapOptions;
  // 标记
  public markers: Array<{ point: Point; options?: MarkerOptions }>;

  constructor(@Optional() private dialogRef: MatDialogRef<ArticleMapDialogComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public articleId: string,
              private articleService: ArticlesService,
              private changeRef: ChangeDetectorRef) {

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
}
