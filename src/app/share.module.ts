import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BannerComponent} from './common/banner/banner.component';
import {ToolbarComponent} from './common/toolbar/toolbar.component';
import {SearchComponent} from './common/search/search.component';
import {CustomMaterialModule} from './customMaterial.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    BannerComponent,
    ToolbarComponent,
    SearchComponent
  ],
  exports: [
    BannerComponent,
    ToolbarComponent,
    SearchComponent
  ]
})
export class ShareModule { }
