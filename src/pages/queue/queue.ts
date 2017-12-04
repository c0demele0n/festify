import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular'

@IonicPage()
@Component({
    selector: 'page-queue',
    templateUrl: 'queue.html'
})
export class QueuePage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events
    ) {}

    // function which publishes events
    publishEvent(eventName: string) {
        this.events.publish('all-events', eventName)
    }
}
