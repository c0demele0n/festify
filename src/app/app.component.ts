import { Component } from '@angular/core'
import { Platform, App } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

// page imports
import { HomePage } from '../pages/home/home'
import { NavPage } from '../pages/nav/nav'
import { QueuePage } from '../pages/queue/queue'

import { SpotifyProvider } from '../providers/spotify/spotify'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = NavPage

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    spotify: SpotifyProvider,
    public app: App
  ) {
    // retrieve url from custom url scheme redirect
    // only cordova app
    const w = window as any
    w.handleOpenURL = (url: string) => {
      // redirect to the NavPage
      //   this.app.getRootNav().setRoot(NavPage)
      // hand over url to spotify provider
      //   spotify.setAccessToken(url)
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      splashScreen.hide()
    })
  }
}
