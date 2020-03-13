import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SiteplanFullscreenComponent} from './siteplan-fullscreen.component';

describe('SiteplanFullscreenComponent', () => {
  let component: SiteplanFullscreenComponent;
  let fixture: ComponentFixture<SiteplanFullscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SiteplanFullscreenComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteplanFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
