import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpositionStatisticsComponent } from './exposition-statistics.component';

describe('ExpositionStatisticsComponent', () => {
  let component: ExpositionStatisticsComponent;
  let fixture: ComponentFixture<ExpositionStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpositionStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpositionStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
