import { Component } from '@angular/core'
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler'
import { NavController, Nav, AlertController } from 'ionic-angular'
import { SpotifyProvider } from '../../providers/spotify/spotify'
import { LoadingController } from 'ionic-angular'

// page imports
import { NavPage } from '../nav/nav'
import { ErrorHandler } from '@angular/core/src/error_handler'
import { errorHandler } from '@angular/platform-browser/src/browser'
import { Events } from 'ionic-angular'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public startApp: boolean = false
  constructor(
    public spotify: SpotifyProvider,
    private alertCtrl: AlertController,
    public events: Events,
    public navCtrl: NavController,
    public nav: Nav,
    public errorHandler: ErrorHandlerProvider,
    public loadingCtrl: LoadingController
  ) {
    this.initializeSubScriptions()
  }

  // lifecycle function which handles the redirect when using mobile web and desktop web
  ionViewDidEnter() {
    // if (this.spotify.isLoggedIn()) {
    //   // you are already logged in
    //   alert('You are already logged in')
    //   //   this.nav.setRoot(NavPage)
    // } else {
    //   // you are not logged out
    //   // do nothing
    // }
  }

  public initializeSubScriptions() {
    this.events.subscribe('networkOnStart', eventName => {
      if (eventName == 'offline') {
      }
      if (eventName == 'online') {
      }
    })
  }

  createParty() {
    this.spotify.init().then($Data => {
      console.log('spotify.init() >> true')
    }),
      $Error => {
        console.log('spotify.init() >> false')
        console.log('passt ned')
      }
  }

  joinParty() {
    /*
      TODO:       Implement complete logic
      Dependency: After finishing the logic for the host
    */
  }
  reopenParty() {
    /*
      TODO:       Implement complete logic
      Dependency: Task MPJ-19
                  Logic for closing the Party (Settings)
    */
  }
}
