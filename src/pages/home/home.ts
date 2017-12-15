import { Component } from '@angular/core'
import { NavController, Nav } from 'ionic-angular'
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler'

// page imports
import { NavPage } from '../nav/nav'
import { ErrorHandler } from '@angular/core/src/error_handler'
import { errorHandler } from '@angular/platform-browser/src/browser'
import { Events } from 'ionic-angular'
import { AlertController } from 'ionic-angular'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public startApp: boolean = false
  constructor(
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
    /*
      TODO:       Implement complete logic
      Dependency: Task MPJ-19
    */
    // redirect to NavPage

    if (this.startApp == true) {
      this.nav.setRoot(NavPage)
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
