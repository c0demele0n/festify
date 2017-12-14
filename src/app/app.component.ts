import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import firebase from 'firebase'

import { NavPage } from '../pages/nav/nav'

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = NavPage

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen
    ) {
        firebase.initializeApp({
            apiKey: 'AIzaSyDl9A10FlNzy3smQQWp11RzYVPs2FgOzMg',
            authDomain: 'festify-dev.firebaseapp.com',
            databaseURL: 'https://festify-dev-pse.firebaseio.com/'
          })
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault()
            splashScreen.hide()
        })
    }
}
