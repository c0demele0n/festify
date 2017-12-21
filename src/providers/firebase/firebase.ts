import { Injectable } from '@angular/core'

import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'

@Injectable()
export class FirebaseProvider {
  private userAuth: any
  authState: any = null
  userId: any = null

  firebaseNetwork: any = firebase.database().ref('.info/connected')
  constructor(public afd: AngularFireDatabase, public auth: AngularFireAuth) {}

  createAnonymousUser() {
    // we will use anonymous auth turn it on on firebase
    firebase
      .auth()
      .signInAnonymously()
      .then(auth => {
        // when authenticated... alert the user
        console.log('login success')
        this.userAuth = auth
        this.userId = this.auth.auth.currentUser.uid
        console.log('User:', this.userId)
      })
      .catch((error: Error) => {
        // Handle Errors here.
        var errorMessage = error.message
        alert(errorMessage)
      })
  }
  //check if firebase network available
  firebaseNetworkConnection() {
    this.firebaseNetwork.on('value', function(snap) {
      if (snap.val() === true) {
        console.log('connected')
      } else {
        console.log('not connected')
      }
    })
  }
  getPartyItems() {
    return this.afd.list('/parties')
  }

  addParty() {
    const userId = this.auth.auth.currentUser.uid
    if (!userId || userId.length < 1) {
      throw new Error('Tried to create a party but user ID was null or empty!')
    }

    const now = firebase.database.ServerValue.TIMESTAMP

    const party = {
      country: 'DE',
      created_at: now,
      created_by: userId,
      name: "Today's Party",
      playback: {
        last_change: now,
        last_position_ms: 0,
        playing: false
      },
      short_id: Math.floor(Math.random() * 1000000) + ''
    }
    const key = firebase
      .database()
      .ref('/parties')
      .push(party).key
    return [key, party]

    // let o = this.afd.object('/parties')
    // o.set({ party })
  }
}
