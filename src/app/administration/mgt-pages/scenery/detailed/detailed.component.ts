import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Article} from '../../../../core/models/article';
import {Topic} from '../../../../core/models/topic';
import {ArticlesService} from '../../../../core/services/articles.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {DOCUMENT} from '@angular/common';
import {ImageCropperDialogComponent} from '../../../../dialog/image-cropper-dialog/image-cropper-dialog.component';
import {FileHolder} from 'angular2-image-upload';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent implements OnInit {

  form: FormGroup;
  croppedImage: any = '';
  file: any = '';
  oldCoverImage: string = './assets/img/upload_bg.png';
  article: Article;
  top: Topic;
  // 上传返回的图片路径
  res_image_url: any;
  // 富文本编辑器配置，添加自定义事件
  quillEditorRef: any;

  constructor(
    private fb: FormBuilder,
    private articlesService: ArticlesService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document) {
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
      state: null,
      content: null
    });
  }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        if (data[0]) {
          this.form.patchValue(data[0]);
          this.article = data[0];
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

  openCropperDialog() {
    const dialogRef = this.dialog.open(ImageCropperDialogComponent, {
      width: '900px',
      data: {
        title: '封面上传',
        resizeToWidth: 1920,
        cropperMinWidth: 1080,
        aspectRatio: 16 / 9,
        maintainAspectRatio: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.oldCoverImage = result;
      this.croppedImage = result;
    });
  }

  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
    const toolbar = editorInstance.getModule('toolbar');
    toolbar.addHandler('image', () => {
      this.imageHandler();
    });
  }

  imageHandler() {
    const fileUpload: HTMLElement = this.document.querySelector('#upload_image input') as HTMLElement;
    fileUpload.click();
  }

  onUploadFinished(file: FileHolder) {
    this.articlesService.uploadImage(file.src).subscribe(
      data => {
        if (data) {
          this.res_image_url = data.image_url;
          this.insertToEditor(this.res_image_url);
        }
      }
    );
  }

  insertToEditor(url: string) {
    const range = this.quillEditorRef.getSelection();
    const delta = this.quillEditorRef.insertEmbed(range.index, 'image', `${url}`);
  }
}
