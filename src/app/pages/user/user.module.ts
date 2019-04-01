import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoComponent} from './info/info.component';
import {SettingComponent} from './setting/setting.component';
import {CollectionComponent} from './collection/collection.component';
import {NewsComponent} from './news/news.component';
import {UserComponent} from './user.component';
import {UserRoutes} from './user.routing';
import {CustomMaterialModule} from '../../customMaterial.module';
import {PublishComponent} from './publish/publish.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropperDialogModule} from '../../dialog/image-cropper-dialog/image-cropper-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutes,
    CustomMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperDialogModule
  ],
  declarations: [InfoComponent, SettingComponent, CollectionComponent,
    NewsComponent, UserComponent, PublishComponent],
})
export class UserModule {
}
