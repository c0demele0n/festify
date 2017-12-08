import { Component } from '@angular/core'
<<<<<<< HEAD
import { IonicPage, NavController, NavParams } from 'ionic-angular'
=======
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular'
>>>>>>> master

// provider imports
import { PlatformServiceProvider } from '../../providers/platform-service/platform-service'

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
<<<<<<< HEAD
    dark: boolean = false

    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsPage')
=======
    plt: string

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public platform: PlatformServiceProvider
    ) {
        // get current platform
        this.plt = this.platform.getPlatform()
>>>>>>> master
    }
}
