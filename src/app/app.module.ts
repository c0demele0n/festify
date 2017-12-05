import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'

import { MyApp } from './app.component'

// Pages
import { NavPage } from '../pages/nav/nav'
import { HomePage } from '../pages/home/home'
import { QueuePage } from '../pages/queue/queue'
import { AdminPage } from '../pages/admin/admin'
import { SettingsPage } from '../pages/settings/settings'
import { TvModePage } from '../pages/tv-mode/tv-mode'

// Providers
import { SpotifiyProvider } from '../providers/spotifiy/spotifiy'
import { FirebaseProvider } from '../providers/firebase/firebase'
import { SettingsProvider } from '../providers/settings/settings'
import { ErrorHandlerProvider } from '../providers/error-handler/error-handler'
import { PlatformServiceProvider } from '../providers/platform-service/platform-service'

@NgModule({
    declarations: [
        MyApp,
        NavPage,
        HomePage,
        QueuePage,
        AdminPage,
        SettingsPage,
        TvModePage
    ],
    imports: [BrowserModule, IonicModule.forRoot(MyApp)],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        NavPage,
        HomePage,
        QueuePage,
        AdminPage,
        SettingsPage,
        TvModePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        SpotifiyProvider,
        FirebaseProvider,
        SettingsProvider,
        ErrorHandlerProvider,
        PlatformServiceProvider
    ]
})
export class AppModule {}
