import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { SpotifiyProvider } from '../../providers/spotifiy/spotifiy'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    constructor(
        public navCtrl: NavController,
        public spotify: SpotifiyProvider
    ) {}
}
