import { Component } from '@angular/core'
import {
    IonicPage,
    Nav,
    NavController,
    NavParams,
    Events,
    Platform,
    PopoverController,
    ViewController
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
    root = QueuePage
    tab1 = QueuePage
    tab2 = AdminPage
    tab3 = SettingsPage

    plt: string

    constructor(
        public nav: Nav,
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public platform: PlatformServiceProvider,
        public popoverCtrl: PopoverController
    ) {
        // get current platform
        this.plt = this.platform.getPlatform()

        // subscribe to all events
        this.events.subscribe('all-events', eventName => {
            if (eventName == 'exit-party') {
                this.exitPart()
            }
            if (eventName == 'tv-mode') {
                this.tvMode()
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
    exitPart() {
        console.log('exitParty()')
    }

    // function which switches to the tv mode
    tvMode() {
        console.log('tvMode()')
    }

    // function which provides a share link to the current party
    shareParty() {
        console.log('shareParty()')
    }

    // function which pushes the settings-page to the navigation stack
    showSettings() {
        console.log('showSettings()')
    }

    // functio which toggles the 'more' menu on android devices
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
    openPage(page: any) {
        this.root = page
    }
}
