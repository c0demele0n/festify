import { Injectable } from '@angular/core'
import { Events } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app'

@Injectable()
export class FirebaseProvider {
  private userAuth: any
  authState: any = null
  userId: any = null
  firebaseNetwork: any
  parties: Observable<any[]>;
   shortID:any;
  party:any;

  constructor(
    public afd: AngularFireDatabase,
    public auth: AngularFireAuth,
    public events: Events
  ) {
    
    this.firebaseNetwork = firebase.database().ref('.info/connected')
  }

  createAnonymousUser() {
    // we will use anonymous auth turn it on on firebase
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInAnonymously()
        .then(auth => {
          // when authenticated... alert the user
          console.log('login success')
          this.userAuth = auth
          this.userId = this.auth.auth.currentUser.uid
          console.log('User:', this.userId)

          resolve({ $ID: this.userId, $Msg: 'success' })
          this.events.publish('firebase', 'AUcreated')
        })
        .catch((error: Error) => {
          // Handle Errors here.
          var errorMessage = error.message
          alert(errorMessage)

          reject({ $ID: '', $Msg: errorMessage })
        })
    })
  }

  //check if firebase network available
  firebaseNetworkConnection() {
    this.firebaseNetwork.on('value', function(snap) {
      if (snap.val() === true) {
        console.log('connected!!!!')
        return true
      } else {
        console.log('firebaseNetworkConnection(): offline')
        return false
      }
    })
  }
//get party data from firebase
  getPartyItems() {
    return this.afd.list('/parties')
    // this.partyItems =  this.afd.list('/parties')
    // this.parties=this.partyItems.valueChanges();
    // return this.parties.subscribe(val=>console.log(val));

   }
   setShort_id(id){
    this.shortID=id;
   }
   getShort_id(){
     return this.shortID;
   }

  //create and add new Party to firebase
  addParty() {
    const userId = this.auth.auth.currentUser.uid
    if (!userId || userId.length < 1) {
      this.events.publish('firebase', 'userIdNotCreated')
      console.log('addParty(): ofuserIdNotCreatedfline')
    }

    return new Promise((resolve, reject) => {
    const now = firebase.database.ServerValue.TIMESTAMP
    this.party = {
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
     firebase
      .database()
      .ref('/parties')
      .push(this.party).key
      resolve({ $Party: this.party, $Msg: 'success' })
    })
  
  }
  //set short_id
  addShortID(){
    this.setShort_id(this.party.short_id);

  }
//check if short_id is exists in firebase
  checkShortID(shortValue){
    
    firebase.database().ref().child("parties").orderByChild('short_id').equalTo(shortValue).once("value",snapshot => {
      const shortData = snapshot.val();
      if (shortData){
        console.log("exists!");
      }else{
        console.log("not exists!")
      }
  });
  

}
  
}
