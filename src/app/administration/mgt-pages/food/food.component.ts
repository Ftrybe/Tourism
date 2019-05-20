import {Component, OnInit} from '@angular/core';
import {ArticleMap} from '../../../core/models/article-map';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {FoodService} from '../../../core/services/food.service';
import {Food} from '../../../core/models/food';
import {FoodMapDialogComponent} from './food-map-dialog/food-map-dialog.component';
import {ConfirmRequestDialogComponent} from '../../../dialog/confirm-request-dialog/confirm-request-dialog.component';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  displayedColumns = ['title', 'topic', 'ops'];
  articleMap: ArticleMap;
  articleDialog: any;
  foods: Food[];

  constructor(private foodService: FoodService,
              private router: Router, private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.list();
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmRequestDialogComponent, {
      data: '确认删除美食信息？'
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.foodService.delete(id).subscribe(
            () => {
              this.list();
            }
          );
        }
      }
    );
  }

  list() {
    this.foodService.list().subscribe(
      articles => {
        this.foods = articles;
      }
    );
  }

  saveMap(data) {
    this.foodService.saveMap(data).subscribe(
      data => {
        if (data) {
          return;
        }
      }
    );
  }

  updateMap(data) {
    this.foodService.updateMap(data).subscribe();
  }

  jump(id: any) {
    this.router.navigate(['/manager/food/detailed', id]);
  }


  /**
   *  打开地图设置
   * @param id
   */
  openMapDialog(id) {
    this.articleDialog = this.dialog.open(FoodMapDialogComponent, {
      data: id,
      width: '800px'
    });
    this.articleDialog.afterClosed().subscribe((map: ArticleMap) => {
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
