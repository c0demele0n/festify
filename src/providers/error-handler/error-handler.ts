// import { HttpClient } from '@angular/common/http'
import { Injectable, ErrorHandler } from '@angular/core'
import { Events } from 'ionic-angular'
import { IonicErrorHandler } from 'ionic-angular/util/ionic-error-handler'
import { Network } from '@ionic-native/network'
import { AlertController } from 'ionic-angular'

/*
  Generated class for the ErrorHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ErrorHandlerProvider {
  fireBaseInOnline: boolean = false
  dataBaseIsOnlice: boolean = false
  networkIsOnline: boolean = false

  constructor(
    public errorHandler: ErrorHandler,
    public network: Network,
    private alertCtrl: AlertController,
    public events: Events
  ) {
    // check network status
    this.networkIsOnline = navigator.onLine
    // for debugging
    console.log('online: ' + this.networkIsOnline)

    // connect subscription
    let connectSubscription = this.network.onConnect().subscribe(
      data => {
        this.networkIsOnline = true
        console.log(data)
      },
      error => console.error(error)
    )

    // disconnect subscription
    let disconnectSubscription = this.network.onDisconnect().subscribe(
      data => {
        this.networkIsOnline = false
        console.log(data)
      },
      error => console.error(error)
    )
  }
  public isNetworkAvailable() {
    if (this.networkIsOnline == true) {
      return true
    }
    if (this.networkIsOnline == false) {
      console.log('New event created')
      this.events.publish('network:state', 'network', 'offline')
    }
  }
}
