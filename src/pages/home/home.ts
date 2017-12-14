import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { FirebaseProvider } from '../../providers/firebase/firebase'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public firebaseProvider:FirebaseProvider) {
    this.firebaseProvider.createAnonymousUser();
    
  }
  createParty() {
    /*
      TODO:       Implement complete logic
      Dependency: Task MPJ-19
    */
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

