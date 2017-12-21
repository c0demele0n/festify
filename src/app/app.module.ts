import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'


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

var config = {
  apiKey: 'AIzaSyDl9A10FlNzy3smQQWp11RzYVPs2FgOzMg',
  authDomain: 'festify-dev.firebaseapp.com',
  databaseURL: 'https://festify-dev-pse.firebaseio.com',
  projectId: 'festify-dev',
  storageBucket: 'festify-dev.appspot.com',
  messagingSenderId: '1010348797724'
}

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

  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp)
  ],

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
    SocialSharing
  ]
})
export class AppModule {}
