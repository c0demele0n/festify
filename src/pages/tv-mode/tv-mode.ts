import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular'

// provider imports
import { PlatformServiceProvider } from '../../providers/platform-service/platform-service'

//plugin imports
import { ScreenOrientation } from '@ionic-native/screen-orientation'
import { StatusBar } from '@ionic-native/status-bar'
import { AndroidFullScreen } from '@ionic-native/android-full-screen'

@IonicPage()
@Component({
  selector: 'page-tv-mode',
  templateUrl: 'tv-mode.html'
})
export class TvModePage {
  plt: string
  queue = []
  meta = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public platform: PlatformServiceProvider,
    private screenOrientation: ScreenOrientation,
    private statusBar: StatusBar,
    private androidFullScreen: AndroidFullScreen
  ) {
    // get current platform
    this.plt = this.platform.getPlatform()
    ;(this.queue = [
      this.track1,
      this.track1,
      this.track1,
      this.track1,
      this.track1,
      this.track1
    ]),
      (this.meta = [this.url, this.id])
    //only lock orientation on cordova since it will crash on browser
    if (this.plt == 'cordova') {
      // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE)
      this.statusBar.hide()
    }
    if (this.plt == 'android') {
      this.androidFullScreen
        .isImmersiveModeSupported()
        .then(() => this.androidFullScreen.immersiveMode())
    }
  }

  track1: any = {
    name: 'Track X',
    artist: 'Artist X',
    thumbnail: 'assets/imgs/logo.png'
  }
  current: any = {
    name: 'In the end',
    artist: 'Linkin Park',
    thumbnail: 'assets/imgs/logo.png'
  }
  url: string = 'festify.us'
  id: number = 12345

  //unlocks Orientation
  ionViewWillLeave() {
    this.screenOrientation.unlock()
  }
}
