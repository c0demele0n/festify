import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

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

    constructor(public navCtrl: NavController, public navParams: NavParams) {}
}
