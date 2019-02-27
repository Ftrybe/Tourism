import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutes, RoutingComponents} from './home.routing';
import {SharedModule} from '../../shared/shared.module';
import {ImageCropperModule} from 'ngx-image-cropper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BannerDialogComponent} from './banner/banner-dialog/banner-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutes,
    ImageCropperModule
  ],
  declarations: [RoutingComponents, BannerDialogComponent],
  entryComponents: [BannerDialogComponent]
})
export class HomeModule {
}
