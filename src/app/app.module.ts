import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http'

import { MyApp } from './app.component'

// Pages
import { NavPage } from '../pages/nav/nav'
import { HomePage } from '../pages/home/home'
import { QueuePage } from '../pages/queue/queue'
import { AdminPage } from '../pages/admin/admin'
import { SettingsPage } from '../pages/settings/settings'
import { TvModePage } from '../pages/tv-mode/tv-mode'
import { MorePage } from '../pages/more/more'

// Providers
import { FirebaseProvider } from '../providers/firebase/firebase'
import { SettingsProvider } from '../providers/settings/settings'
import { ErrorHandlerProvider } from '../providers/error-handler/error-handler'
import { SpotifyProvider } from '../providers/spotify/spotify'
import { PlatformServiceProvider } from '../providers/platform-service/platform-service'

// Plugins
import { SocialSharing } from '@ionic-native/social-sharing'
import { ScreenOrientation } from '@ionic-native/screen-orientation'

@NgModule({
  declarations: [
    MyApp,
    NavPage,
    HomePage,
    QueuePage,
    AdminPage,
    SettingsPage,
    MorePage,
    TvModePage
  ],

  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(MyApp)],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NavPage,
    HomePage,
    QueuePage,
    AdminPage,
    SettingsPage,
    MorePage,
    TvModePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FirebaseProvider,
    SettingsProvider,
    ErrorHandlerProvider,
    PlatformServiceProvider,
    SpotifyProvider,
    SocialSharing,
    ScreenOrientation
  ]
})
export class AppModule {}
