import { Component } from '@angular/core'
import {
    IonicPage,
    NavController,
    NavParams,
    ViewController,
    Events
} from 'ionic-angular'

@IonicPage()
@Component({
    selector: 'page-more',
    templateUrl: 'more.html'
})
export class MorePage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public events: Events
    ) {}

    // function which publishes events
    publishEvent(eventName: string) {
        this.viewCtrl.dismiss()
        this.events.publish('all-events', eventName)
    }
}
