import { Component } from '@angular/core'
import { NavController, Nav, AlertController } from 'ionic-angular'
import { LoadingController } from 'ionic-angular'
import { Events } from 'ionic-angular'

// page imports
import { NavPage } from '../nav/nav'

// provider imports
import { SpotifyProvider } from '../../providers/spotify/spotify'
import { FirebaseProvider } from '../../providers/firebase/firebase'
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler'

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

  // lifecycle function which handles the redirect when using mobile web and desktop web
  async ionViewDidEnter() {
    // this.spotify.setAccessToken()

    let accessTokenStatus = await this.spotify.setAccessToken()
    if (accessTokenStatus) {
      let spotifyStatus = await this.spotify.init()
      if (spotifyStatus) {
        let firebaseAnonymousUserStatus = await this.firebase.createAnonymousUser()
        if ((firebaseAnonymousUserStatus as any).$ID) {
          await this.firebase.addParty()
          this.firebase.addShortID()
          this.nav.setRoot(NavPage)
        }
      }
    }
  }

  public initializeSubScriptions() {
    this.events.subscribe('firebase', eventName => {
      if (eventName == 'AUcreated') {
        console.log('Event5:' + eventName + ' triggered')
        this.firebase.firebaseNetworkConnection()

        // if (!this.spotify.isLoggedIn()) {
        //   this.spotify.login()
        // } else {
        //   this.checkForPremium()
        // }
      }
    })
  }

  async createParty() {
    let firebaseAnonymousUserStatus = await this.firebase.createAnonymousUser()
    if ((firebaseAnonymousUserStatus as any).$ID) {
      let spotifyStatus = await this.spotify.init()

      if (spotifyStatus) {
        await this.firebase.addParty()
        this.nav.setRoot(NavPage)
      }
    }
  }

  joinParty() {
    let prompt = this.alertCtrl.create({
      title: 'Enter Party ID',
      message: 'Enter the Party ID to join this party',
      inputs: [
        {
          name: 'shortId',
          placeholder: 'Party ID'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked')
          }
        },
        {
          text: 'Join',
          handler: data => {
            this.firebase.checkShortID(data.shortId).then(
              $Data => {
                // success
                // navigate to navPage
              },
              $Error => {
                // something went wrong
                // error handling
              }
            )
          }
        }
      ]
    })
    prompt.present()

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
