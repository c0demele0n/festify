import { Component, ViewChild } from '@angular/core'
import {
  IonicPage,
  Nav,
  NavController,
  NavParams,
  Events,
  Platform,
  PopoverController,
  ViewController,
  ModalController,
  Tabs,
  AlertController,
  ActionSheetController,
  LoadingController
} from 'ionic-angular'

// page imports
import { AdminPage } from '../admin/admin'
import { HomePage } from '../home/home'
import { QueuePage } from '../queue/queue'
import { SettingsPage } from '../settings/settings'
import { TvModePage } from '../tv-mode/tv-mode'
import { MorePage } from '../more/more'

// provider imports
import { PlatformServiceProvider } from '../../providers/platform-service/platform-service'
import { SpotifyProvider } from '../../providers/spotify/spotify'

// plugin imports
import { SocialSharing } from '@ionic-native/social-sharing'

@IonicPage()
@Component({
  selector: 'page-nav',
  templateUrl: 'nav.html'
})
export class NavPage {
  // local tab references to the tabs
  @ViewChild('tabsIos') tabRefIos: Tabs
  @ViewChild('tabsAndroid') tabRefAndroid: Tabs

  // selected tab index when page is loaded (standart tab)
  selectedTabIndex: number = 0

  // current tab name
  currentTabName: string = 'QueuePage'

  root = QueuePage

  tab1: any = {
    Name: 'Queue',
    Page: QueuePage,
    Icon: 'icon-playlist'
  }
  tab2: any = {
    Name: 'Admin',
    Page: AdminPage,
    Icon: 'contact'
  }
  tab3: any = {
    Name: 'Settings',
    Page: SettingsPage,
    Icon: 'settings'
  }
  tab4: any = {
    Name: 'TV Mode',
    Page: TvModePage,
    Icon: 'desktop'
  }

  // array which holds all tabs
  tabs = [this.tab1, this.tab2, this.tab3, this.tab4]

  // string which holds the current platform name
  plt: string

  constructor(
    public nav: Nav,
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public platform: PlatformServiceProvider,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public socialSharing: SocialSharing,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public spotify: SpotifyProvider
  ) {
    // get partyname from nav params
    console.log('Partyname: ' + this.navParams.get('partyName'))

    // get current platform
    this.plt = this.platform.getPlatform()
    if (this.plt == 'desktopweb') {
      this.openPage(this.tab1.Page, this.tab1.Name)
    }

    // subscribe to all events
    this.events.subscribe('all-events', eventName => {
      if (eventName == 'exit-party') {
        this.exitParty()
      }
      if (eventName == 'tv-mode') {
        this.showTvMode()
      }
      if (eventName == 'share-party') {
        this.shareParty()
      }
      if (eventName == 'show-settings') {
        this.showSettings()
      }
    })
  }

  // function which shutdowns the current party
  exitParty() {
    console.log('exitParty()')
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you really want to exit the party?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Exit',
          handler: () => {
            // navigate to HomePage (StartPage)
            // this.spotify.logout()
            this.spotify.removeAccessToken()
            // this.spotify.logout()
            this.nav.setRoot(HomePage)
          }
        }
      ]
    })
    alert.present()
  }

  // function which switches to the tv mode
  showTvMode() {
    this.nav.setRoot(TvModePage)
  }

  copyToClipboard(partyID: string) {
    let textArea = document.createElement('textarea')

    textArea.value = partyID

    document.body.appendChild(textArea)

    textArea.select()

    try {
      var successful = document.execCommand('copy')
      var msg = successful ? 'successful' : 'unsuccessful'
      console.log('Copying text command was ' + msg)
    } catch (err) {
      console.log('Oops, unable to copy')
    }

    document.body.removeChild(textArea)
  }

  shareAlert(partyID) {}

  // function which provides a share link to the current party
  shareParty() {
    // Dummy PartyID
    let partyID = '1234567890'

    // mobile app
    if (this.plt == 'cordova') {
      this.socialSharing.share(partyID)
    } else {
      // mobile web
      let shareAlert = this.alertCtrl.create({
        title: 'Share this party',
        message:
          'To share this party with your friends, send them the party code<br /> <h3>' +
          partyID +
          '</h3>',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked')
            }
          },

          {
            text: 'Copy to Clipboard',
            role: 'null',
            handler: () => {
              console.log('Copied to clipboard')
              this.copyToClipboard(partyID)
            }
          }
        ]
      })
      shareAlert.present()
    }
  }

  // function which pushes the settings-page to the navigation stack
  showSettings() {
    console.log('showSettings()')

    let settingsModal = this.modalCtrl.create(
      SettingsPage,
      {},
      {
        showBackdrop: true,
        enableBackdropDismiss: true
      }
    )
    settingsModal.present()
  }

  // function which toggles the 'more' menu on android devices
  toggleMore(myEvent) {
    console.log('toggleMore()')
    let morePopover = this.popoverCtrl.create(MorePage)
    morePopover.present({
      ev: myEvent
    })
  }

  // function which pushes a new page to the navigation stack (only for web-view)
  openPage(page: any, pageName?: string) {
    // FIXME
    // if you are trying to show the TV Mode Page, when the Split Pane is overlayed,
    // the app throws a TransitionError because of the Transition of the Split Pane Menu
    // to fix this, there is a simple Timeout with a Loading Message implemented
    // should be fixed!!!
    if (pageName == 'TV Mode') {
      let loading = this.loadingCtrl.create({
        content: 'Loading TV Mode...'
      })
      loading.present()
      setTimeout(() => {
        loading.dismiss()
        this.nav.setRoot(TvModePage)
      }, 500)
    } else {
      // normal procedure when changing the tab on mobile and desktop web
      this.root = page
      this.namePage(pageName)
    }
  }

  // function which listens to the ionChange tab event
  tabChanged(pltName: string) {
    if (this.tabRefIos != null || this.tabRefAndroid != null) {
      if (pltName == 'ios') {
        this.namePage(this.tabRefIos.getSelected().tabTitle)
      }
      if (pltName == 'android') {
        this.namePage(this.tabRefAndroid.getSelected().tabTitle)
      }
    }
  }

  // function which names the current page
  namePage(pageName: string) {
    this.currentTabName = pageName
  }
}
