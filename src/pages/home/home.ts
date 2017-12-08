import { Component } from '@angular/core'
import { NavController, Nav } from 'ionic-angular'

// page imports
import { NavPage } from '../nav/nav'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    constructor(public navCtrl: NavController, public nav: Nav) {}
    createParty() {
        /*
      TODO:       Implement complete logic
      Dependency: Task MPJ-19
    */

        // redirect to NavPage
        this.nav.setRoot(NavPage)
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
