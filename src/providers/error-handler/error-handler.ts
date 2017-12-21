// import { HttpClient } from '@angular/common/http'
import { Injectable, ErrorHandler } from '@angular/core'
import { Events } from 'ionic-angular'
import { IonicErrorHandler } from 'ionic-angular/util/ionic-error-handler'
import { Network } from '@ionic-native/network'
import { AlertController, LoadingController } from 'ionic-angular'
import { Loading } from 'ionic-angular/components/loading/loading'

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
  loadingMessageCanBeDismissed: boolean = false
  loading: any

  constructor(
    public errorHandler: ErrorHandler,
    public network: Network,
    private alertCtrl: AlertController,
    public events: Events,
    public loadingCtrl: LoadingController
  ) {
    // check network status
    this.networkIsOnline = navigator.onLine
    this.isNetworkAvailable()
    console.log('online: ' + this.networkIsOnline)

    // connect subscription
    let connectSubscription = this.network.onConnect().subscribe(
      data => {
        this.networkIsOnline = true
        console.log(data)
        this.events.publish('networkOnStart', 'online')
        this.deActivateLoadingController('Network deactivated')
      },
      error => console.error(error)
    )

    // disconnect subscription
    let disconnectSubscription = this.network.onDisconnect().subscribe(
      data => {
        this.networkIsOnline = false
        console.log(data)
        this.events.publish('networkOnStart', 'offline')
        this.activateLoadingController('Network activated')
      },
      error => console.error(error)
    )
  }
  // check if there is a network connection on startup
  public isNetworkAvailable() {
    if (this.networkIsOnline == false) {
      console.log('New event created while network was offline on startup')
      this.events.publish('networkOnStart', 'offline')
    }
    if (navigator.onLine == false) {
      this.activateLoadingController('Network on startup offline !')
    }
  }

  // activate a loading controller with an error message
  public activateLoadingController(message: string) {
    console.log('Event1:' + message + ' triggered')
    this.loading = this.loadingCtrl.create({
      content: 'No network connection...'
    })
    this.loading.present()
    this.loadingMessageCanBeDismissed = true
  }

  // deactivate the loading controller
  public deActivateLoadingController(message: String) {
    console.log('Event2:' + message + ' triggered')
    this.loading.onDidDismiss(() => {
      this.loadingMessageCanBeDismissed = false
    })
    if (this.loadingMessageCanBeDismissed == true) {
      this.loading.dismiss()
    }
  }
}
