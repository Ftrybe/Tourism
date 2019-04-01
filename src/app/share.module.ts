import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BannerComponent} from './common/banner/banner.component';
import {CustomMaterialModule} from './customMaterial.module';
import {FilePreviewOverlayToolbarComponent} from './common/file-preview-overlay/file-preview-overlay-toolbar/file-preview-overlay-toolbar.component';
import {FilePreviewOverlayComponent} from './common/file-preview-overlay/file-preview-overlay.component';
import {FilePreviewOverlayService} from './common/file-preview-overlay/file-preview-overlay.service';
import {NumberSimplifyPipe} from './core/pipe/number-simplify.pipe';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  declarations: [
    BannerComponent,
    FilePreviewOverlayToolbarComponent,
    FilePreviewOverlayComponent,
    NumberSimplifyPipe
  ],
  exports: [
    BannerComponent,
    NumberSimplifyPipe
  ],
  providers: [
    FilePreviewOverlayService
  ],
  entryComponents: [
    FilePreviewOverlayComponent
  ]
})
export class ShareModule {
}
