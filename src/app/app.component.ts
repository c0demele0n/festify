import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
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
  rootPage: any = HomePage

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, spotify: SpotifyProvider) {
    // retrieve url from custom url scheme redirect
    ;(window as any).handleOpenURL = (url: string) => {
      // hand over url to spotify provider
      spotify.setAccessToken(url)
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent()
      splashScreen.hide()
    })
  }
}
