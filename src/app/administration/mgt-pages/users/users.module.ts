import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {SharedModule} from '../../shared/shared.module';
import {PipesModule} from '../../theme/pipes/pipes.module';
import {UsersComponent} from './users.component';
import {UserDialogComponent} from './user-dialog/user-dialog.component';
import {RoutingComponents, UsersRoutes} from './users.routing';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    UsersRoutes,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule
  ],
  declarations: [
    RoutingComponents,
    UsersComponent,
    UserDialogComponent
  ],
  entryComponents: [
    UserDialogComponent
  ]
})
export class UsersModule {
}
