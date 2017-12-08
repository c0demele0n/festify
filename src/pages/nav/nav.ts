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
    Tabs
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
        public modalCtrl: ModalController
    ) {
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
            if (eventName == 'toggle-more') {
                this.toggleMore()
            }
        })
    }

    // function which shutdowns the current party
    exitParty() {
        console.log('exitParty()')
    }

    // function which switches to the tv mode
    showTvMode() {
        console.log('tvMode()')

        let tvModeModal = this.modalCtrl.create(
            TvModePage,
            {},
            {
                showBackdrop: true,
                enableBackdropDismiss: true
            }
        )
        tvModeModal.present()
    }

    // function which provides a share link to the current party
    shareParty() {
        console.log('shareParty()')
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
    toggleMore() {
        console.log('toggleMore()')
        let morePopover = this.popoverCtrl.create(
            MorePage,
            {},
            { cssClass: 'more-popover' }
        )
        morePopover.present()
    }

    // function which pushes a new page to the navigation stack (only for web-view)
    openPage(page: any, pageName?: string) {
        this.root = page
        this.namePage(pageName)
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
