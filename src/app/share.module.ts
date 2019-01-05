import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BannerComponent} from './common/banner/banner.component';
import {ToolbarComponent} from './common/toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BannerComponent,
    ToolbarComponent
  ],
  exports: [
    BannerComponent,
    ToolbarComponent
  ]
})
export class ShareModule { }
