// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// import {NewAdminExhibitComponent} from './new-admin-exhibit.component';
// import {SidebarComponent} from '../../sidebar/sidebar.component';
// import {RouterLink, RouterModule, Routes} from '@angular/router';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import {AppComponent} from '../../../app.component';
// import {MuseumComponent} from '../../../user/welcome/welcome.component';
// import {ExpositionComponent} from '../../../user/exposition/exposition.component';
// import {ExhibitComponent} from '../../../user/exhibit/exhibit.component';
// import {AdminComponent} from '../../admin.component';
// import {LoginComponent} from '../../login/login.component';
// import {HomeComponent} from '../../home/home.component';
// import {AdminExpositionComponent} from '../../exposition/admin-exposition.component';
// import {RemovableThumbnailComponent} from '../../../helper/removable-thumbnail/removable-thumbnail.component';
// import {AdminExhibitComponent} from '../admin-exhibit.component';
// import {LoggingComponent} from '../../logging/logging.component';
// import {AdminInfopagesComponent} from '../../infopages/admin-infopages.component';
// import {PersonalDataComponent} from '../../personal-data/personal-data.component';
// import {MuseumStatisticsComponent} from '../../museum-statistics/museum-statistics.component';
// import {CommentComponent} from '../../../user/comment/comment.component';
// import {InfopageComponent} from '../../../user/infopage/infopage.component';
// import {ErrorPageComponent} from '../../../helper/error-page/error-page.component';
// import {UserComponent} from '../../../user/user.component';
// import {NewAdminExpositionComponent} from '../../exposition/new/new-admin-exposition.component';
// import {ExpositionCardComponent} from '../../../helper/exposition-card/exposition-card.component';
// import {ExhibitCardComponent} from '../../../helper/exhibit-card/exhibit-card.component';
// import {BoxCardComponent} from '../../../helper/box-card/box-card.component';
// import {NewAdminInfopageComponent} from '../../infopages/infopage/new/new-admin-infopage.component';
// import {AdminInfopageComponent} from '../../infopages/infopage/admin-infopage.component';
// import {BrowserModule} from '@angular/platform-browser';
// import {FormsModule} from '@angular/forms';
// import {HttpClient, HttpClientModule} from '@angular/common/http';
// import {SlickCarouselModule} from 'ngx-slick-carousel';
// import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
// import {NgxChartsModule} from '@swimlane/ngx-charts';
// import {CookieService} from 'ngx-cookie-service';
//
//
// describe('NewAdminExhibitComponent', () => {
//
//     // Needed as reference to the tested component
//     let component: NewAdminExhibitComponent;
//     // Holds the component and exposes information about the component
//     let fixture: ComponentFixture<NewAdminExhibitComponent>;
//
//     // Set all needed dependencies before starting to test the module
//     beforeEach(async(() => {
//
//         // Just copied routes from the app.module.ts
//         const appRoutes: Routes = [
//             {
//                 path: '', component: UserComponent, children: [
//                     {path: '', component: MuseumComponent},
//                     {path: 'exposition/:id', component: ExpositionComponent},
//                     {path: 'exhibit/:id', component: ExhibitComponent},
//                     {path: 'infopage/:id', component: InfopageComponent},
//                 ]
//             },
//             {
//                 path: 'admin', component: AdminComponent, children: [
//                     {path: '', component: LoginComponent},
//                     {path: 'home', component: HomeComponent},
//                     {path: 'exposition/new', component: NewAdminExpositionComponent},
//                     {path: 'exposition/:id', component: AdminExpositionComponent},
//                     {path: 'exhibit/new/:expo_id', component: NewAdminExhibitComponent},
//                     {path: 'exhibit/:id', component: AdminExhibitComponent},
//                     {path: 'infopages', component: AdminInfopagesComponent},
//                     {path: 'infopage/new', component: NewAdminInfopageComponent},
//                     {path: 'infopage/:id', component: AdminInfopageComponent},
//                     {path: 'statistics', component: MuseumStatisticsComponent},
//                     {path: 'logging', component: LoggingComponent},
//                     {path: 'personal-data', component: PersonalDataComponent}
//                 ]
//             },
//             {path: '**', component: ErrorPageComponent},
//         ];
//
//         // Configurations needed for testing the module
//         // Also copied from the app.module.ts
//         TestBed.configureTestingModule({
//
//             declarations: [AppComponent,
//                 MuseumComponent,
//                 ExpositionComponent,
//                 ExhibitComponent,
//                 AdminComponent,
//                 LoginComponent,
//                 HomeComponent,
//                 SidebarComponent,
//                 AdminExpositionComponent,
//                 RemovableThumbnailComponent,
//                 AdminExhibitComponent,
//                 LoggingComponent,
//                 AdminInfopagesComponent,
//                 PersonalDataComponent,
//                 HomeComponent,
//                 MuseumStatisticsComponent,
//                 CommentComponent,
//                 InfopageComponent,
//                 ErrorPageComponent,
//                 UserComponent,
//                 NewAdminExpositionComponent,
//                 NewAdminExhibitComponent,
//                 ExpositionCardComponent,
//                 ExhibitCardComponent,
//                 BoxCardComponent,
//                 NewAdminInfopageComponent,
//                 AdminInfopageComponent],
//             imports: [RouterModule.forRoot(
//                 appRoutes,
//                 {onSameUrlNavigation: 'reload', enableTracing: false} // <-- debugging purposes only
//             ), BrowserModule,
//                 FormsModule,
//                 HttpClientModule,
//                 NgbModule,
//                 SlickCarouselModule,
//                 FontAwesomeModule,
//                 NgxChartsModule],
//             providers: [CookieService, HttpClient]
//         })
//             .compileComponents();
//     }));
//
//     // Initializing the component to make it ready for testing
//     beforeEach(() => {
//         fixture = TestBed.createComponent(NewAdminExhibitComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });
//
//     // Testing createExhibit()
//     it('should create an exhibit', () => {
//         component.createExhibit();
//         expect(component.exhibit).toBeDefined();
//     });
//
// });
