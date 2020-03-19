import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminMuseumComponent} from './admin-museum.component';

describe('AdminMuseumComponent', () => {
  let component: AdminMuseumComponent;
  let fixture: ComponentFixture<AdminMuseumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMuseumComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMuseumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
