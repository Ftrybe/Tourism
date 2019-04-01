import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {ArticlesService} from '../../../../core/services/articles.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from '../../../../core/models/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  form: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  file: any = '';
  oldCoverImage: string = './assets/img/upload_bg.png';

  constructor(private fb: FormBuilder, private articlesService: ArticlesService, private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({
      id: null,
      title: null,
      coverUrl: null,
      name: null,
      businessHours: null,
      cost: null,
      address: null,
      contact: null,
      topic: null,
      declaration: null,
      state: null
    });
  }

  fileChangeEvent(event: any): void {
    this.croppedImage = '';
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  startCropImage() {

  }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        if (data[0]) {
          this.form.patchValue(data[0]);
          this.oldCoverImage = data[0].coverUrl;
        }
      }
    );
  }

  submit() {
    const article: Article = this.form.value as Article;
    console.log(article.id);
    if (article.id) {
      this.croppedImage.length > 1 ?
        article.coverUrl = this.croppedImage : article.coverUrl = this.oldCoverImage;
      this.articlesService.updateArticle(article).subscribe(
        data => {
          this.router.navigate(['/manager/articles']);
        }
      );
    } else {
      article.coverUrl = this.croppedImage;
      this.articlesService.addArticle(article).subscribe(
        data => {
          this.router.navigate(['/manager/articles']);
        }
      );
    }
  }


}
