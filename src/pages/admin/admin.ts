import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular'

// provider imports
import { PlatformServiceProvider } from '../../providers/platform-service/platform-service'

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
  partyName: string = ''
  partyNamePlaceholder = 'Partyname'

  plt: string
  playlists = []
  generalName: string = 'Name of Party:'
  amount: String = 'Nr. of Titles:'

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public platform: PlatformServiceProvider
  ) {
    // get current platform
    this.plt = this.platform.getPlatform()
    this.playlists = [
      this.playlist1,
      this.playlist1,
      this.playlist1,
      this.playlist1,
      this.playlist1,
      this.playlist1,
      this.playlist1,
      this.playlist1
    ]
  }

  ionViewDidEnter() {
    this.partyNamePlaceholder = 'Partyname'
  }
  playlist1: any = {
    Name: 'Cool Playlist !',
    AnzTitel: '43',
    thumbnail: 'assets/imgs/logo.png'
  }

  clearPartyName() {
    this.partyName = ''
    this.partyNamePlaceholder = ''
  }
}
