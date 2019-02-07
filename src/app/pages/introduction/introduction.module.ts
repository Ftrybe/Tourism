import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './introduction.component';
import { IntroductionRoutes } from './introduction.routing';

@NgModule({
  imports: [
    CommonModule,
    IntroductionRoutes  ],
  declarations: [IntroductionComponent]
})
export class IntroductionModule { }
