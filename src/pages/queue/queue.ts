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
    // <only for dev>
    if (this.spotify.isLoggedIn()) {
      // redirect to NavPage
    } else {
      this.spotify.login()
    }
  }

  // function which publishes events
  publishEvent(eventName: string) {
    // this.viewCtrl.dismiss()
    this.events.publish('all-events', eventName)
  }

  // function which calls the spotify provider to search for tracks
  async getTracks(ev: any) {
    if (ev.target.value) {
      // trigger spotify search

      this.spotify.getTracks(ev.target.value).then($Data => {
        this.tracks = $Data
      })
    } else {
      // don't trigger spotify search
      // clear tracks array
      this.tracks = []
    }
  }

  clearSearch(ev: any) {
    // clear tracks array
    this.tracks = []
  }
}
