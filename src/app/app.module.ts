import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './common/footer/footer.component';
import {NavbarComponent} from './common/navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignComponent} from './dialog/sign';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationInterceptor} from './core/interceptors/authentication.interceptor';
import {HasRoleDirective} from './core/directive/has-role.directive';
import {CustomMaterialModule} from './customMaterial.module';
import {UserStatusComponent} from './common/navbar/userStatus.component';
import {NotesListComponent} from './pages/home/notes-list/notes-list.component';
import {ShareModule} from './share.module';
import {OverlayModule} from '@angular/cdk/overlay';
import {OverlayComponent} from './common/overlay/overlay.component';
import {SignModule} from './dialog/sign/sign.module';
import {WINDOW_PROVIDERS} from './core/services/window.service';
import {BackToTopDirective} from './core/directive/back-to-top.directive';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FooterComponent,
    NavbarComponent,
    SignComponent,
    OverlayComponent,
    HasRoleDirective,
    UserStatusComponent,
    NotesListComponent,
    BackToTopDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ShareModule,
    CustomMaterialModule,
    OverlayModule,
    SignModule

  ],
  entryComponents:
    [
      SignComponent,
      OverlayComponent
    ],
  providers:
    [
      Title,
      [{provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}],
      WINDOW_PROVIDERS
    ],
  bootstrap:
    [
      AppComponent
    ]
})

export class AppModule {
}
