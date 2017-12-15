import { Component } from '@angular/core'
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler'
import { NavController, Nav, AlertController } from 'ionic-angular'
import { SpotifyProvider } from '../../providers/spotify/spotify'

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
    public errorHandler: ErrorHandlerProvider
  ) {
    events.subscribe('network:state', (network, state) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      let alert = this.alertCtrl.create({
        title: network,
        subTitle: state
      })
      alert.present()
    })
  }

  ionViewDidEnter() {
    if (this.errorHandler.isNetworkAvailable() == true) {
      console.log('Is Device online: ' + this.errorHandler.isNetworkAvailable())
      console.log('Starting app')
      this.startApp = true
    }
  }

  createParty() {
    if (this.startApp == true) {
      this.nav.setRoot(NavPage)
    }
    // if (this.spotify.isLoggedIn()) {
    //   // redirect to NavPage
    //   this.nav.setRoot(NavPage)
    // } else {
    //   this.spotify.login()
    // }

    let alert = this.alertCtrl.create({
      title: 'Set Partyname',
      inputs: [
        {
          name: 'partyName',
          placeholder: 'Partyname'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {}
        },
        {
          text: 'Party hard',
          handler: data => {
            // check if partyName is not empty
            if (!data.partyName) {
              let alert = this.alertCtrl.create({
                title: 'Name is missing!',
                subTitle: 'Please enter a name for your party',
                buttons: ['Dismiss']
              })
              alert.present()
            } else {
              // redirect to NavPage
              this.nav.setRoot(NavPage, { partyName: data.partyName })
            }
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
