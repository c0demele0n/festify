// import { HttpClient } from '@angular/common/http'
import { Injectable, ErrorHandler } from '@angular/core'
import { Events } from 'ionic-angular'
import { IonicErrorHandler } from 'ionic-angular/util/ionic-error-handler'
import { Network } from '@ionic-native/network'
import { AlertController, LoadingController } from 'ionic-angular'
import { Loading } from 'ionic-angular/components/loading/loading'

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
    this.initializeSubScriptionsForErrorhandler()
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
  initializeSubScriptionsForErrorhandler() {
    this.events.subscribe('firebase', eventName => {
      if (eventName == 'userIdNotCreated') {
        console.log('Event4:' + eventName + ' triggered')
        this.loading = this.loadingCtrl.create({
          content: 'No UserID available...'
        })
        this.loading.present()
        this.loadingMessageCanBeDismissed = true
      }
    })

    this.events.subscribe('spotify', err => {
      const errorStatus = err.error.error.status ? err.error.error.status : err.status
      let subTitle
      let title
      if (errorStatus == 404) {
        title = 'Device not found'
        subTitle = 'Make sure your device is active or choose another one \n Spotify Error Code: ' + errorStatus
      } else if (errorStatus == 403) {
        title = 'You have no access to this function'
        subTitle = 'Make sure you are logged in with a Spotify Premium Account \n Spotify Error Code: ' + errorStatus
      } else if (errorStatus == 500) {
        title = 'Internal Spotify Error'
        subTitle = 'Please retry again later \n Spotify Error Code: ' + errorStatus
      } else if (errorStatus == 202) {
        title = 'Your device is temporarily unavailable'
        subTitle = 'Please retry again later \n Spotify Error Code: ' + errorStatus
      } else {
        title = 'Error ' + errorStatus
        subTitle = err
      }

      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: ['Okay']
      })
      alert.present()
    })
  }
}
