import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExpositionFullscreenComponent} from './exposition-fullscreen.component';

describe('ExpositionFullscreenComponent', () => {
  let component: ExpositionFullscreenComponent;
  let fixture: ComponentFixture<ExpositionFullscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExpositionFullscreenComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpositionFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
