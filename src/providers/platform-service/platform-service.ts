import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Platform } from 'ionic-angular'

@Injectable()
export class PlatformServiceProvider {
  plts: string[]
  plt: string

  // toggle 'dev' to 'true' when testing the application in your local browser
  dev: boolean = false

  constructor(public platform: Platform) {
    // platforms
    // ios (device): ["cordova", "mobile", "ios", "iphone"] (4)
    // ios (webbrowser): ["mobile", "ios", "iphone", "mobileweb"] (4)
    // web: ['core'] (1)

    // save the current platform(s) in array 'plts[]'
    this.plts = this.platform.platforms()

    if (this.dev) {
      console.log('you are in developing mode: platform check is faked')
    }

    // check which platform the client uses

    // plt: cordova
    if ((this.dev && this.plts.indexOf('mobileweb') > -1) || this.plts.indexOf('cordova') > -1) {
      console.log('Client Platform: CORDOVA')
      this.plt = 'cordova'
    }

    // plt: mobileweb
    if (!this.dev && this.plts.indexOf('mobileweb') > -1) {
      console.log('Client Platform: MOBILEWEB')
      this.plt = 'mobileweb'
    }

    // plt: desktopweb
    if (this.plts.indexOf('core') > -1) {
      console.log('Client Platform: DESKTOPWEB')
      this.plt = 'desktopweb'
    }
  }

  // function which returns the current platform
  getPlatform() {
    return this.plt
  }
}
