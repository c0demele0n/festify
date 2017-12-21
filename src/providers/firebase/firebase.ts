import { Injectable } from '@angular/core'
import firebase from 'firebase'


/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  public fireAuth: firebase.auth.Auth
  public userProfile: firebase.database.Reference
  public currentUser: firebase.User
 
  constructor() {
    this.userProfile = firebase.database().ref('/userProfile')
    this.fireAuth = firebase.auth()

    firebase.auth().onAuthStateChanged(user => {
      this.currentUser = user
      var uid = user.uid
      console.log(user)
      console.log('UID: ', uid)
    })
  }
  // methode: signin to the Firebase as anonymous user
  createAnonymousUser() {
    return this.fireAuth.signInAnonymously()
  }
}
