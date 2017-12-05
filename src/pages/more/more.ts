import { Component } from '@angular/core'
import {
    IonicPage,
    NavController,
    NavParams,
    ViewController
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
        public viewCtrl: ViewController
    ) {}

    close() {
        this.viewCtrl.dismiss()
    }
}
