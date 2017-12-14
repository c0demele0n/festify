import { Injectable } from '@angular/core'
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  constructor(public afd: AngularFireDatabase, public auth: AngularFireAuth) {
    this.auth.auth.signInAnonymously()
    // auth.authState.subscribe(user => {
    //   console.log(user)
    //   if (user) {
    //     console.log(user.uid)
    //   }
    // })
  }
}
