import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './common/footer/footer.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignComponent,LoginComponent,RegisterComponent } from './dialog/sign';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './core/interceptors/authentication.interceptor';
import { HasRoleDirective } from './core/directive/has-role.directive';
import { CustomMaterialModule } from './customMaterial.module';
import { UserStatusComponent } from './common/navbar/userStatus.component';
import { NotesListComponent } from './home/notes-list/notes-list.component';


@NgModule({
   declarations: [
      AppComponent,
      routingComponents,
      FooterComponent,
      NavbarComponent,
      SignComponent,
      LoginComponent,
      RegisterComponent,
      HasRoleDirective,
      UserStatusComponent,
      NotesListComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      CustomMaterialModule

   ],
   entryComponents: [
    SignComponent,
    LoginComponent,
    RegisterComponent
   ],
   providers: [
       Title,
        [{provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}]
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
