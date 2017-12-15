import { Component } from '@angular/core'
import { NavController, Nav, AlertController } from 'ionic-angular'
import { SpotifyProvider } from '../../providers/spotify/spotify'

// page imports
import { NavPage } from '../nav/nav'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public nav: Nav,
    public alertCtrl: AlertController,
    public spotify: SpotifyProvider
  ) {}



  createParty() {
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
