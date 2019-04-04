import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BannerComponent} from './common/banner/banner.component';
import {CustomMaterialModule} from './customMaterial.module';
import {FilePreviewOverlayToolbarComponent} from './common/file-preview-overlay/file-preview-overlay-toolbar/file-preview-overlay-toolbar.component';
import {FilePreviewOverlayComponent} from './common/file-preview-overlay/file-preview-overlay.component';
import {FilePreviewOverlayService} from './common/file-preview-overlay/file-preview-overlay.service';
import {NumberSimplifyPipe} from './core/pipe/number-simplify.pipe';
import {LetterLengthLimitDirective} from './core/directive/letter-length-limit.directive';
import {ConfirmRequestDialogComponent} from './dialog/confirm-request-dialog/confirm-request-dialog.component';
import {DateConvertPassPipe} from './core/pipe/date-convert-pass.pipe';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  declarations: [
    BannerComponent,
    FilePreviewOverlayToolbarComponent,
    FilePreviewOverlayComponent,
    NumberSimplifyPipe,
    DateConvertPassPipe,
    ConfirmRequestDialogComponent,
    LetterLengthLimitDirective
  ],
  exports: [
    BannerComponent,
    NumberSimplifyPipe,
    DateConvertPassPipe,
    LetterLengthLimitDirective
  ],
  providers: [
    FilePreviewOverlayService
  ],
  entryComponents: [
    ConfirmRequestDialogComponent,
    FilePreviewOverlayComponent
  ]
})
export class ShareModule {
}
