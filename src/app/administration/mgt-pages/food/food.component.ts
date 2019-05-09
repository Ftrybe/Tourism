import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ArticleMap} from '../../../core/models/article-map';
import {ArticlesService} from '../../../core/services/articles.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ArticleMapDialogComponent} from '../articles/article-map-dialog/article-map-dialog.component';
import {FoodService} from '../../../core/services/food.service';
import {Food} from '../../../core/models/food';
import {FoodMapDialogComponent} from './food-map-dialog/food-map-dialog.component';

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
              private router: Router, private dialog: MatDialog, private changeRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.list();
  }

  delete(id: any) {

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
        console.log('1');
      }
    );
  }

  updateMap(data) {
    this.foodService.updateMap(data).subscribe();
  }

  jump(id: any) {
    this.router.navigate(['/manager/articles/article', id]);
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
