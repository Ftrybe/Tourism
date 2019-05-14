import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdministrationComponent} from './administration.component';
import {AdministrationRoutes} from './administration.routing';
import {CustomOverlayContainer} from './theme/utils/custom-overlay-container';
import {OverlayContainer} from '@angular/cdk/overlay';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {AppSettings} from './app.settings';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PagesComponent} from './mgt-pages/pages.component';
import {SharedModule} from './shared/shared.module';
import {HorizontalMenuComponent} from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import {VerticalMenuComponent} from './theme/components/menu/vertical-menu/vertical-menu.component';
import {SidenavComponent} from './theme/components/sidenav/sidenav.component';
import {FullScreenComponent} from './theme/components/fullscreen/fullscreen.component';
import {ApplicationsComponent} from './theme/components/applications/applications.component';
import {FavoritesComponent} from './theme/components/favorites/favorites.component';
import {UserMenuComponent} from './theme/components/user-menu/user-menu.component';
import {MessagesComponent} from './theme/components/messages/messages.component';
import {PipesModule} from './theme/pipes/pipes.module';
import {MenuService} from './theme/components/menu/menu.service';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    SharedModule,
    PipesModule,
    AdministrationRoutes
  ],
  declarations: [
    AdministrationComponent,
    PagesComponent,
    SidenavComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    FullScreenComponent,
    ApplicationsComponent,
    MessagesComponent,
    UserMenuComponent,
    FavoritesComponent,
  ],
  providers: [
    AppSettings,
    {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
    {provide: OverlayContainer, useClass: CustomOverlayContainer},
    MenuService
  ],
})
export class AdministrationModule {
}
