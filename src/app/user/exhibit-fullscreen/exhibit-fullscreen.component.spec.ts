import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExhibitFullscreenComponent} from './exhibit-fullscreen.component';

describe('ExhibitFullscreenComponent', () => {
  let component: ExhibitFullscreenComponent;
  let fixture: ComponentFixture<ExhibitFullscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExhibitFullscreenComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
