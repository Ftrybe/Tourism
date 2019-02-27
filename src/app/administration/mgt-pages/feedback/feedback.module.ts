import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FeedbackRoutes, RoutingComponents} from './feedback.routing';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FeedbackRoutes

  ],
  declarations: [RoutingComponents]
})
export class FeedbackModule {
}
