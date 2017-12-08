import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular'

// provider imports
import { PlatformServiceProvider } from '../../providers/platform-service/platform-service'

@IonicPage()
@Component({
    selector: 'page-queue',
    templateUrl: 'queue.html'
})
export class QueuePage {
    plt: string

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public platform: PlatformServiceProvider
    ) {
        // get current platform
        this.plt = this.platform.getPlatform()
    }
}
