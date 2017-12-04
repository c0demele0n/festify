import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular'

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
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
