// ///<reference path="../exposition/admin-exposition.component.ts"/>
// import {AdminExpositionComponent} from '../exposition/admin-exposition.component';
// import {NewAdminExhibitComponent} from './new/new-admin-exhibit.component';
// import {NewAdminExpositionComponent} from '../exposition/new/new-admin-exposition.component';
// import {HomeComponent} from '../home/home.component';
// import {LoginComponent} from '../login/login.component';
// import {AdminComponent} from '../admin.component';
// import {InfopageComponent} from '../../user/infopage/infopage.component';
// import {ExhibitComponent} from '../../user/exhibit/exhibit.component';
// import {ExpositionComponent} from '../../user/exposition/exposition.component';
// import {MuseumComponent} from '../../user/museum/museum.component';
// import {UserComponent} from '../../user/user.component';
// import {RouterModule, Routes} from '@angular/router';
// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// import {AdminExhibitComponent} from './admin-exhibit.component';
// import {AdminInfopagesComponent} from '../infopages/admin-infopages.component';
// import {NewAdminInfopageComponent} from '../infopages/infopage/new/new-admin-infopage.component';
// import {AdminInfopageComponent} from '../infopages/infopage/admin-infopage.component';
// import {MuseumStatisticsComponent} from '../museum-statistics/museum-statistics.component';
// import {LoggingComponent} from '../logging/logging.component';
// import {PersonalDataComponent} from '../personal-data/personal-data.component';
// import {ErrorPageComponent} from '../../helper/error-page/error-page.component';
// import {AppComponent} from '../../app.component';
// import {SidebarComponent} from '../sidebar/sidebar.component';
// import {RemovableThumbnailComponent} from '../../helper/removable-thumbnail/removable-thumbnail.component';
// import {CommentComponent} from '../../user/comment/comment.component';
// import {ExpositionCardComponent} from '../../helper/exposition-card/exposition-card.component';
// import {BoxCardComponent} from '../../helper/box-card/box-card.component';
// import {ExhibitCardComponent} from '../../helper/exhibit-card/exhibit-card.component';
// import {BrowserModule} from '@angular/platform-browser';
// import {FormsModule} from '@angular/forms';
// import {HttpClient, HttpClientModule} from '@angular/common/http';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import {SlickCarouselModule} from 'ngx-slick-carousel';
// import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
// import {NgxChartsModule} from '@swimlane/ngx-charts';
// import {CookieService} from 'ngx-cookie-service';
// import {Exhibit} from '../../models/exhibit';
// import {ExhibitContent} from '../../models/exhibit-content';
//
//
// describe('AdminExhibitComponent', () => {
//
//     // Needed as reference to the tested component
//     let component: AdminExhibitComponent;
//     // Holds the component and exposes information about the component
//     let fixture: ComponentFixture<AdminExhibitComponent>;
//
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
//         fixture = TestBed.createComponent(AdminExhibitComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//         component.ngOnInit();
//     });
//
//     // Testing if exhibit is initialized after calling the get-Service
//     it('should initialize an existing exhibit', () => {
//         expect(component.exhibit).toBeDefined();
//     });
//
//     // Testing if audio of exhibit got deleted after calling deleteAudio()
//     it('should delete audio from exhibit', () => {
//         component.deleteAudio();
//         expect(component.exhibit.contents[0].audio).toBeNull();
//     });
//
//     // Testing if video of exhibit got deleted after calling deleteVideo()
//     it('should delete video from exhibit', () => {
//         component.deleteVideo();
//         expect(component.exhibit.contents[0].video).toBeNull();
//     });
//
//     // Testing if current exhibit got deleted after calling deleteExhibit()
//     it('should delete current exhibit', () => {
//         component.deleteExhibit();
//         expect(component.exhibit).toBeUndefined();
//     });
//
//     // Testing if image-stack-amount got increased after calling onImageChanged()
//     // ##### Needs an event as argument, but its not possibly for now. So its a comment for now. #####
//    /* it('should add a new image to exhibit', () => {
//         const currentImageAmount = component.exhibit.contents[0].image.length;
//         component.onImageChanged();
//         const updatedImageAmount = currentImageAmount + 1;
//         expect(component.exhibit.contents[0].image.length).toBe(updatedImageAmount);
//     });*/
//
//     // Testing if audio-stack-amount got increased after calling onAudioChanged()
//     // ##### Needs an event as argument, but its not possibly for now. So its a comment for now. #####
//     /*it('should add a new audio to exhibit', () => {
//          const currentAudioAmount = component.exhibit.contents[0].audio.length;
//        // component.onImageChanged();
//         const updatedAudioAmount = currentAudioAmount + 1;
//         expect(component.exhibit.contents[0].audio.length).toBe(updatedAudioAmount);
//     });*/
//
//     // Testing if video-stack-amount got increased after calling onVideoChanged()
//     // ##### Needs an event as argument, but its not possibly for now. So its a comment for now. #####
//     /*it('should add a new video to exhibit', () => {
//              const currentVideoAmount = component.exhibit.contents[0].video.length;
//        // component.onVideoChanged();
//         const updatedVideoAmount = currentVideoAmount + 1;
//         expect(component.exhibit.contents[0].video.length).toBe(updatedVideoAmount);
//     });*/
//
// });
