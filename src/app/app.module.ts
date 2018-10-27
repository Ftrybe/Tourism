import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './common/footer/footer.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SignComponent,LoginComponent,RegisterComponent } from './dialog/sign';


@NgModule({
   declarations: [
      AppComponent,
      routingComponents,
      FooterComponent,
      NavbarComponent,
      SignComponent,
      LoginComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule
   ],
   providers: [
       Title
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
