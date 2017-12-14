import { Component } from '@angular/core'
import { NavController, Nav, AlertController } from 'ionic-angular'

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
    public alertCtrl: AlertController
  ) {}

  createParty() {
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
            // redirect to NavPage
            this.nav.setRoot(NavPage, { partyName: data.partyName })
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
