import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitStatisticsComponent } from './exhibit-statistics.component';

describe('ExhibitStatisticsComponent', () => {
  let component: ExhibitStatisticsComponent;
  let fixture: ComponentFixture<ExhibitStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
