import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BannerComponent} from './common/banner/banner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BannerComponent
  ],
  exports: [
    BannerComponent
  ]
})
export class ShareModule { }
