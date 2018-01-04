import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular'

// provider imports
import { PlatformServiceProvider } from '../../providers/platform-service/platform-service'
import { SpotifyProvider } from '../../providers/spotify/spotify'

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  dark: boolean = false
  plt: string
  devices: Array<Object> = []
  activeDevice: Object = {}

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

  //TODO: ausgewähltes Gerät speichern
  ionViewDidEnter() {
    this.activeDevice = this.spotify.getActiveDevice()
    this.showAvailableDevices()
  }

  async showAvailableDevices() {
    let result = await this.spotify.getAvailableDevices()
    if (!this.activeDevice) {
      this.activeDevice = await this.spotify.getActiveDeviceFromSpotify()
    }
    this.devices = []
    for (let i = 0; i < result.length; i++) {
      if (!result[i].is_restricted) {
        result[i].checked = (this.activeDevice as any).id == result[i].id
        this.devices.push(result[i])
      }
    }
  }

  setDevice(device) {
    device.checked = true
    this.activeDevice = device
    this.spotify.setSelectedDevice(device)
  }
}
