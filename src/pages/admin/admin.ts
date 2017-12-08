import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-admin',
    templateUrl: 'admin.html'
})
export class AdminPage {
    playlists = []
    generalName: string = 'Name of Party:'
    amount: String = 'Nr. of Titles:'

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.playlists = [
            this.playlist1,
            this.playlist1,
            this.playlist1,
            this.playlist1
        ]
    }
    playlist1: any = {
        Name: 'Cool Playlist !',
        AnzTitel: '43',
        thumbnail: '../assets/imgs/logo.png'
    }
}
