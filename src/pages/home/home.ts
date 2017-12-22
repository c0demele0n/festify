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
import { FirebaseProvider } from '../../providers/firebase/firebase'

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
    public loadingCtrl: LoadingController,
    public firebase: FirebaseProvider
  ) {
    this.initializeSubScriptions()
  }

  ionViewDidEnter() {}

  public initializeSubScriptions() {
    /*
    this.events.subscribe('networkOnStart', eventName => {
      if (eventName == 'offline') {
      }
      if (eventName == 'online') {
      }
    })
    */
    this.events.subscribe('firebase', eventName => {
      if (eventName == 'AUcreated') {
        console.log('Event5:' + eventName + ' triggered')
        this.firebase.firebaseNetworkConnection()
        this.firebase.addParty()
        if (!this.spotify.isLoggedIn()) {
          this.spotify.login()
        } else {
          this.checkForPremium()
        }
      }
    })
  }

  createParty() {
    this.firebase.createAnonymousUser()
  }

  async checkForPremium() {
    const premium = await this.spotify.hasPremium()
    if (!premium) {
      this.createSpotifyAlert()
    } else {
      this.nav.setRoot(NavPage)
    }
  }

  createSpotifyAlert() {
    let alert = this.alertCtrl.create({
      title: 'You have no Spotify Premium account',
      message: 'Do you want to login with a Premium account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {}
        },
        {
          text: 'Ok',
          handler: data => {
            this.spotify.logout()
          }
        }
      ]
    })
    alert.present()
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
