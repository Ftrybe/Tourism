import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FeedbackComponent} from './feedback.component';
import {SharedModule} from '../../shared/shared.module';
import {FeedbackRoutes} from './feedback.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
