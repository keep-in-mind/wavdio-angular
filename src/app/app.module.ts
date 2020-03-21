import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {ServiceWorkerModule} from '@angular/service-worker';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {CookieService} from 'ngx-cookie-service';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {MarkdownModule} from 'ngx-markdown';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {NgxPrintModule} from 'ngx-print';
import {NgxQRCodeModule} from 'ngx-qrcode2';

import {AdminPartCommentCardComponent} from './components/admin/admin-part-comment-card/admin-part-comment-card.component';
import {AdminPageExhibitComponent} from './components/admin/admin-page-exhibit/admin-page-exhibit.component';
import {AdminPageNewExhibitComponent} from './components/admin/admin-page-new-exhibit/admin-page-new-exhibit.component';
import {AdminPageStatisticsComponent} from './components/admin/admin-page-statistics/admin-page-statistics.component';
import {AdminPageExpositionComponent} from './components/admin/admin-page-exposition/admin-page-exposition.component';
import {AdminPageNewExpositionComponent} from './components/admin/admin-page-new-exposition/admin-page-new-exposition.component';
// tslint:disable-next-line:max-line-length
import {AdminPageExpositionStatisticsComponent} from './components/admin/admin-page-exposition-statistics/admin-page-exposition-statistics.component';
import {AdminPageHomeComponent} from './components/admin/admin-page-home/admin-page-home.component';
import {AdminPageInfoPagesComponent} from './components/admin/admin-page-info-pages/admin-page-info-pages.component';
import {AdminPageInfoPageComponent} from './components/admin/admin-page-info-page/admin-page-info-page.component';
import {AdminPageNewInfoPageComponent} from './components/admin/admin-page-new-info-page/admin-page-new-info-page.component';
import {AdminPageLoginComponent} from './components/admin/admin-page-login/admin-page-login.component';
import {AdminPageMuseumStatisticsComponent} from './components/admin/admin-page-museum-statistics/admin-page-museum-statistics.component';
import {AdminPagePersonalDataComponent} from './components/admin/admin-page-personal-data/admin-page-personal-data.component';
import {AdminPageSettingsComponent} from './components/admin/admin-page-settings/admin-page-settings.component';
import {AdminPartSidebarComponent} from './components/admin/admin-part-sidebar/admin-part-sidebar.component';
import {AppComponent} from './app.component';
import {AdminPartAlertComponent} from './components/admin/admin-part-alert/admin-part-alert.component';
import {CommonPartAudioPlayerComponent} from './components/common/common-part-audio-player/common-part-audio-player.component';
import {AdminPartBoxCardComponent} from './components/admin/admin-part-box-card/admin-part-box-card.component';
import {CommonPartCookieBannerComponent} from './components/common/common-part-cookie-banner/common-part-cookie-banner.component';
import {ErrorPageComponent} from './helper/error-page/error-page.component';
import {ExhibitCardComponent} from './helper/exhibit-card/exhibit-card.component';
import {ExpositionCardComponent} from './helper/exposition-card/exposition-card.component';
import {ImageDetailsComponent} from './helper/image-details/image-details.component';
import {SpinnerComponent} from './helper/spinner/spinner.component';
import {QrcodeComponent} from './helper/qrcode/qrcode.component';
import {VideoPlayerComponent} from './helper/video-player/video-player.component';
import {AppBarComponent} from './user/app-bar/app-bar.component';
import {CommentComponent} from './user/comment/comment.component';
import {ExhibitComponent} from './user/exhibit/exhibit.component';
import {ExpositionComponent} from './user/exposition/exposition.component';
import {InfopageComponent} from './user/infopage/infopage.component';
import {MuseumComponent} from './user/museum/museum.component';
import {UserComponent} from './user/user.component';
import {UsageTermsComponent} from './user/usage-terms/usage-terms.component';
import {WelcomeComponent} from './user/welcome/welcome.component';
import {environment} from '../environments/environment';
import {PrivacyPolicyComponent} from './user/privacy-policy/privacy-policy.component';
import {CarouselComponent} from './user/carousel/carousel.component';
import {ExhibitFullscreenComponent} from './user/exhibit-fullscreen/exhibit-fullscreen.component';
import {ExpositionFullscreenComponent} from './user/exposition-fullscreen/exposition-fullscreen.component';
import {MuseumFullscreenComponent} from './user/museum-fullscreen/museum-fullscreen.component';
import {SiteplanFullscreenComponent} from './user/siteplan-fullscreen/siteplan-fullscreen.component';
import {ImprintComponent} from './user/imprint/imprint.component';
import {AdminPageMuseumComponent} from './components/admin/admin-page-museum/admin-page-museum.component';
import {AdminPartHeaderComponent} from './components/admin/admin-part-header/admin-part-header.component';

const appRoutes: Routes = [
  {
    path: '', component: UserComponent, children: [
      {path: '', component: WelcomeComponent},
      {path: 'museum', component: MuseumComponent},
      {path: 'museum/fullscreen', component: MuseumFullscreenComponent},
      {path: 'siteplan', component: SiteplanFullscreenComponent},
      {path: 'exposition/:id', component: ExpositionComponent},
      {path: 'exposition/:id/fullscreen', component: ExpositionFullscreenComponent},
      {path: 'exhibit/:id', component: ExhibitComponent},
      {path: 'exhibit/:id/fullscreen', component: ExhibitFullscreenComponent},
      {path: 'infopage/:id', component: InfopageComponent},
    ]
  },
  {path: 'admin', component: AdminPageLoginComponent},
  {path: 'admin/museum', component: AdminPageMuseumComponent},
  {path: 'admin/home', component: AdminPageHomeComponent},
  {path: 'admin/exposition/new', component: AdminPageNewExpositionComponent},
  {path: 'admin/exposition/:id', component: AdminPageExpositionComponent},
  {path: 'admin/exhibit/new/:expo_id', component: AdminPageNewExhibitComponent},
  {path: 'admin/exhibit/:id', component: AdminPageExhibitComponent},
  {path: 'admin/infopages', component: AdminPageInfoPagesComponent},
  {path: 'admin/infopage/new', component: AdminPageNewInfoPageComponent},
  {path: 'admin/infopage/:id', component: AdminPageInfoPageComponent},
  {path: 'admin/statistics', component: AdminPageMuseumStatisticsComponent},
  {path: 'admin/statistics/exposition/:id', component: AdminPageExpositionStatisticsComponent},
  {path: 'admin/statistics/exhibit/:id', component: AdminPageStatisticsComponent},
  {path: 'admin/personal-data', component: AdminPagePersonalDataComponent},
  {path: 'admin/settings', component: AdminPageSettingsComponent},
  {
    path: 'user', component: UserComponent, children: [
      {path: 'usage-terms', component: UsageTermsComponent},
      {path: 'privacy-policy', component: PrivacyPolicyComponent},
      {path: 'imprint', component: ImprintComponent}
    ]
  },
  {path: '**', component: ErrorPageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ExpositionComponent,
    ExhibitComponent,
    AdminPageLoginComponent,
    AdminPageHomeComponent,
    AdminPartSidebarComponent,
    AdminPageExpositionComponent,
    AdminPageExhibitComponent,
    AdminPageInfoPagesComponent,
    AdminPagePersonalDataComponent,
    AdminPageHomeComponent,
    AdminPageMuseumStatisticsComponent,
    CommentComponent,
    InfopageComponent,
    ErrorPageComponent,
    UserComponent,
    AdminPageNewExpositionComponent,
    AdminPageNewExhibitComponent,
    ExpositionCardComponent,
    ExhibitCardComponent,
    AdminPartBoxCardComponent,
    AdminPageNewInfoPageComponent,
    AdminPageInfoPageComponent,
    UsageTermsComponent,
    AdminPageExpositionStatisticsComponent,
    AdminPageStatisticsComponent,
    AdminPartCommentCardComponent,
    ImageDetailsComponent,
    AdminPartAlertComponent,
    SpinnerComponent,
    QrcodeComponent,
    MuseumComponent,
    CommonPartCookieBannerComponent,
    CommonPartAudioPlayerComponent,
    VideoPlayerComponent,
    AdminPageSettingsComponent,
    AppBarComponent,
    PrivacyPolicyComponent,
    CarouselComponent,
    ExhibitFullscreenComponent,
    ExpositionFullscreenComponent,
    MuseumFullscreenComponent,
    SiteplanFullscreenComponent,
    ImprintComponent,
    AdminPageMuseumComponent,
    AdminPartHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {onSameUrlNavigation: 'reload', enableTracing: false} // <-- debugging purposes only
    ),
    NgbModule,
    SlickCarouselModule,
    FontAwesomeModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    NgxQRCodeModule,
    NgxPrintModule,
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    LoggerModule.forRoot({
      level: environment.production ? NgxLoggerLevel.OFF : NgxLoggerLevel.TRACE,
      serverLogLevel: environment.production ? NgxLoggerLevel.OFF : NgxLoggerLevel.TRACE,
      serverLoggingUrl: '/api/v2/logs'
    }),
    MarkdownModule.forRoot()
  ],
  exports: [
    CommentComponent
  ],
  entryComponents: [
    CommentComponent,
    ImageDetailsComponent,
    SpinnerComponent,
    QrcodeComponent
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(fas);
  }
}
