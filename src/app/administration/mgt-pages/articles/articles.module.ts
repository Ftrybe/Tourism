import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticlesRoutes, RoutingComponents} from './articles.routing';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {QuillModule} from 'ngx-quill';
import {ArticleMapDialogComponent} from './article-map-dialog/article-map-dialog.component';
import {BaiduMapModule} from 'angular2-baidu-map';
import {ImageCropperDialogModule} from '../../../dialog/image-cropper-dialog/image-cropper-dialog.module';
import {ArticlesImageDialogComponent} from './articles-image-dialog/articles-image-dialog.component';
import {ImageUploadModule} from 'angular2-image-upload';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    ArticlesRoutes,
    QuillModule,
    ImageCropperDialogModule,
    BaiduMapModule.forRoot({ak: '8F1HxkUfqSGRywCZYdEZqw4DGLX5glk2'}),
    ImageUploadModule
  ],
  declarations: [RoutingComponents, ArticleMapDialogComponent, ArticlesImageDialogComponent],
  entryComponents: [ArticleMapDialogComponent, ArticlesImageDialogComponent]
})
export class ArticlesModule {
}
