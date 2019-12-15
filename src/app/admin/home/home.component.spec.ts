// import {NO_ERRORS_SCHEMA} from '@angular/core';
// import {ComponentFixture, TestBed} from '@angular/core/testing';
//
// import {HomeComponent} from './home.component';
// import {ExpositionService} from '../../services/exposition.service';
// import {Exposition} from '../../models/exposition';
// import {from, Observable} from 'rxjs';
// import {HttpClientModule} from '@angular/common/http';
//
// let expositionServiceStub: Partial<ExpositionService>;
//
// expositionServiceStub = {
//   getExpositions(): Observable<Exposition[]> {
//     return from([]);
//   }
// };
//
// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;
//
//   beforeEach((() => {
//     TestBed.configureTestingModule({
//       declarations: [HomeComponent],
//       // imports: [HttpClientModule],
//       schemas: [NO_ERRORS_SCHEMA],
//       providers:    [ {provide: ExpositionService, useValue: expositionServiceStub } ]
//     });
//
//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//
//     // expositionService = new MockExpositionService();
//   }));
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
