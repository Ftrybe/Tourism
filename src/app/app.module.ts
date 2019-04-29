import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './common/footer/footer.component';
import {NavbarComponent} from './common/navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignComponent} from './dialog/sign';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {HasRoleDirective} from './core/directive/has-role.directive';
import {CustomMaterialModule} from './customMaterial.module';
import {UserStatusComponent} from './common/navbar/userStatus.component';
import {NotesListComponent} from './pages/home/notes-list/notes-list.component';
import {ShareModule} from './share.module';
import {OverlayModule} from '@angular/cdk/overlay';
import {SignModule} from './dialog/sign/sign.module';
import {WINDOW_PROVIDERS} from './core/services/window.service';
import {BackToTopDirective} from './core/directive/back-to-top.directive';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {TokenService} from './core/services/token.service';
import {ImageCropperModule} from 'ngx-image-cropper';

export function jwtOptionsFactory(tokenService) {
  return {
    tokenGetter: () => {
      return tokenService.getAsyncToken();
    },
    whitelistedDomains: ['localhost:8080', 'ftrybe.com', '127.0.0.1:8080', 'api.ftrybe.com'],
    blacklistedRoutes: []
  };
}


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FooterComponent,
    NavbarComponent,
    SignComponent,
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
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
    CustomMaterialModule,
    OverlayModule,
    SignModule,
    ImageCropperModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [TokenService]
      }
    })

  ],
  entryComponents:
    [
      SignComponent,
    ],
  providers:
    [
      Title,
      WINDOW_PROVIDERS,
      TokenService
    ],
  bootstrap:
    [
      AppComponent
    ]
})

export class AppModule {
}
