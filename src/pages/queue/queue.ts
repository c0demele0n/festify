import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular'

// provider imports
import { PlatformServiceProvider } from '../../providers/platform-service/platform-service'
import { SpotifyProvider } from '../../providers/spotify/spotify'

@IonicPage()
@Component({
  selector: 'page-queue',
  templateUrl: 'queue.html'
})
export class QueuePage {
  searchString: string
  tracks: any
  plt: string
  Code: number = 504215

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public platform: PlatformServiceProvider,
    public spotify: SpotifyProvider
  ) {
    // get current platform
    this.plt = this.platform.getPlatform()
  }

  // function which publishes events
  publishEvent(eventName: string) {
    // this.viewCtrl.dismiss()
    this.events.publish('all-events', eventName)
  }

  // function which calls the spotify provider to search for tracks
  async getTracks(ev: any) {
    // <only for dev>
    if (this.spotify.isLoggedIn()) {
      // redirect to NavPage
    } else {
      this.spotify.login()
    }
    // </only for dev>

    console.log(this.searchString)

    console.log('search for: ' + ev.target.value)
    this.tracks = await this.spotify.getTracks(ev.target.value)
    console.log(this.tracks)

    if (this.searchString == '') {
      console.log('empty')
      this.tracks = {}
    }
  }
}
