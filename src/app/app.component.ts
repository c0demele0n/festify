import { Component } from '@angular/core'
import { Platform, App, Events, Nav } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

// page imports
import { HomePage } from '../pages/home/home'
import { NavPage } from '../pages/nav/nav'

import { SpotifyProvider } from '../providers/spotify/spotify'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    spotify: SpotifyProvider,
    public app: App,
    public events: Events
  ) {
    // retrieve url from custom url scheme redirect
    // only cordova app
    const w = window as any
    w.handleOpenURL = async (url: string) => {
      //   hand over url to spotify provider

      let accessTokenStatus = await spotify.setAccessToken(url)
      if (accessTokenStatus) {
        let spotifyStatus = await spotify.init()
        if (spotifyStatus) this.app.getRootNav().setRoot(NavPage)
      }
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      splashScreen.hide()
    })
  }
}
