import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ArticleMap} from '../../../core/models/article-map';
import {ArticlesService} from '../../../core/services/articles.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ArticleMapDialogComponent} from '../articles/article-map-dialog/article-map-dialog.component';
import {SceneryService} from '../../../core/services/scenery.service';
import {SceneryMapDialogComponent} from './scenery-map-dialog/scenery-map-dialog.component';
import {ConfirmRequestDialogComponent} from '../../../dialog/confirm-request-dialog/confirm-request-dialog.component';

@Component({
  selector: 'app-scenery',
  templateUrl: './scenery.component.html',
  styleUrls: ['./scenery.component.scss']
})
export class SceneryComponent implements OnInit {

  displayedColumns = ['title', 'topic', 'ops'];
  articleMap: ArticleMap;
  sceneryDialog: any;
  sceneries: any;

  constructor(private sceneryService: SceneryService,
              private router: Router, private dialog: MatDialog, private changeRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getList();
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmRequestDialogComponent, {
      data: '确认删除景点信息？'
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.sceneryService.delete(id).subscribe(
            () => {
              this.getList();
            }
          );
        }
      }
    );
  }


  getList() {
    this.sceneryService.list().subscribe(
      articles => {
        console.log(articles);
        this.sceneries = articles;
      }
    );
  }

  saveMap(data) {
    this.sceneryService.saveMap(data).subscribe(
      data => {
        if (data) {
          return;
        }
        console.log('1');
      }
    );
  }

  updateMap(data) {
    this.sceneryService.updateMap(data).subscribe();
  }

  jump(id: any) {
    this.router.navigate(['/manager/scenery/detailed', id]);
  }


  /**
   *  打开地图设置
   * @param id
   */
  openMapDialog(id) {
    this.sceneryDialog = this.dialog.open(SceneryMapDialogComponent, {
      data: id,
      width: '800px'
    });
    this.sceneryDialog.afterClosed().subscribe((map: ArticleMap) => {
      if (map) {
        map.articleId = id;
        if (map.id) {
          this.updateMap(map);
          return;
        }
        this.saveMap(map);
      }

    });
  }

}
