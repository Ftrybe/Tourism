import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesRoutes, RoutingComponents} from './articles.routing';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    ArticlesRoutes
  ],
  declarations: [RoutingComponents]
})
export class ArticlesModule { }
