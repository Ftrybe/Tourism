import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BannerComponent} from './common/banner/banner.component';
import {ToolbarComponent} from './common/toolbar/toolbar.component';
import {SearchComponent} from './common/search/search.component';
import {CustomMaterialModule} from './customMaterial.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FilePreviewOverlayToolbarComponent} from './common/file-preview-overlay/file-preview-overlay-toolbar/file-preview-overlay-toolbar.component';
import {FilePreviewOverlayComponent} from './common/file-preview-overlay/file-preview-overlay.component';
import {FilePreviewOverlayService} from './common/file-preview-overlay/file-preview-overlay.service';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    BannerComponent,
    ToolbarComponent,
    SearchComponent,
    FilePreviewOverlayToolbarComponent,
    FilePreviewOverlayComponent
  ],
  exports: [
    BannerComponent,
    ToolbarComponent,
    SearchComponent
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
