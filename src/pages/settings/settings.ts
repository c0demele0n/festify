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
  volume: number
  showVolume: boolean

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

  ionViewWillEnter() {
    this.updateStatus()
  }

  async updateStatus() {
    let result = await this.spotify.getAvailableDevices()
    this.devices = []

    for (let i = 0; i < result.length; i++) {
      const device = result[i]
      const { is_restricted, is_active } = device

      if (!is_restricted) {
        this.devices.push(device)

        if (is_active) {
          this.updateVolume(device)
        }
      }
    }
  }

  updateVolume({ volume_percent }) {
    if (volume_percent) {
      this.showVolume = true
      this.volume = volume_percent
    } else {
      this.showVolume = false
    }
  }

  setDevice(device) {
    this.updateVolume(device)
    this.spotify.setSelectedDevice(device)
  }

  setVolume(volume) {
    this.spotify.setVolumeOnDevice(volume)
  }
}
