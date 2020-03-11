import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MuseumFullscreenComponent} from './museum-fullscreen.component';

describe('MuseumFullscreenComponent', () => {
  let component: MuseumFullscreenComponent;
  let fixture: ComponentFixture<MuseumFullscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MuseumFullscreenComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuseumFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
