import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
<<<<<<< HEAD

// page imports
import { HomePage } from '../pages/home/home'
import { NavPage } from '../pages/nav/nav'

=======

import { HomePage } from '../pages/home/home'
import { AdminPage } from '../pages/admin/admin'
>>>>>>> 1b4123ba69ead789cf28fafb3040c3e16e68b16c
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
<<<<<<< HEAD
    rootPage: any = HomePage
=======
    rootPage: any = AdminPage
>>>>>>> 1b4123ba69ead789cf28fafb3040c3e16e68b16c

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen
    ) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault()
            splashScreen.hide()
        })
    }
}
