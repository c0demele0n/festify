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

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.playlists = [
            this.playlist1,
            this.playlist2,
            this.playlist1,
            this.playlist2
        ]
    }
    playlist1: any = {
        Name: 'Meine Plylist1',
        AnzTitel: '43',
        Titel: {
            Name: 'Schlecht',
            Dauer: '5.00'
        }
    }
    playlist2: any = {
        Name: 'Meine Plylist2',
        AnzTitel: '5',
        Titel: {
            Name: 'Toll',
            Dauer: '7.00'
        }
    }
}
