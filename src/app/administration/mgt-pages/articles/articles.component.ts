import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ArticlesService} from '../../../core/services/articles.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ArticleMapDialogComponent} from './article-map-dialog/article-map-dialog.component';
import {ArticleMap} from '../../../core/models/article-map';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  displayedColumns = ['title', 'topic', 'ops'];
  articles: any;
  articleMap: ArticleMap;
  articleDialog: any;

  constructor(private articlesService: ArticlesService,
              private router: Router, private dialog: MatDialog, private changeRef: ChangeDetectorRef) {
  }

  ngOnInit() {

  }

  delete(id: any) {

  }

  changeTopic(data: any) {
    if (data != null) {
      this.articlesService.getArticles(data).subscribe(
        articles => {
          this.articles = articles;
        }
      );
    }
  }

  saveMap(data) {
    this.articlesService.saveMap(data).subscribe(
      data => {
        if (data) {
          return;
        }
        console.log('1');
      }
    );
  }

  updateMap(data) {
    this.articlesService.updateMap(data).subscribe();
  }

  jump(id: any) {
    this.router.navigate(['/manager/articles/article', id]);
  }


  /**
   *  打开地图设置
   * @param id
   */
  openMapDialog(id) {
    this.articleDialog = this.dialog.open(ArticleMapDialogComponent, {
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
