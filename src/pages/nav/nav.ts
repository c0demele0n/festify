import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular'

// page imports
import { AdminPage } from '../admin/admin'
import { HomePage } from '../home/home'
import { QueuePage } from '../queue/queue'
import { SettingsPage } from '../settings/settings'
import { TvModePage } from '../tv-mode/tv-mode'

@IonicPage()
@Component({
    selector: 'page-nav',
    templateUrl: 'nav.html'
})
export class NavPage {
    tab1 = QueuePage
    tab2 = AdminPage
    tab3 = SettingsPage

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events
    ) {
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

    // functio which toggles the 'more' menu on android devices
    toggleMore() {
        console.log('toggleMore()')
    }

    // function which pushes a new page to the navigation stack (only for web-view)
    openPage(page: string) {
        this.navCtrl.push(page)
    }
}
