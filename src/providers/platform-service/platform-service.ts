import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Platform } from 'ionic-angular'

@Injectable()
export class PlatformServiceProvider {
    plts: string[]
    plt: string

    // toggle 'dev' to 'true' when testing the application in your local browser
    dev: boolean = true

    constructor(public platform: Platform) {
        // platforms
        // ios (device): ["cordova", "mobile", "ios", "iphone"] (4)
        // ios (webbrowser): ["mobile", "ios", "iphone", "mobileweb"] (4)
        // web: ['core'] (1)

        // log current platform(s) to the console
        this.plts = this.platform.platforms()
        console.log(this.plts)

        if (this.dev) {
            console.log('you are in developing mode: platform check is faked')
        }

        // check if application is installed native on the device using cordova
        if (this.plts.indexOf('cordova') > -1 || this.dev) {
            console.log('cordova: true')
            this.plt = 'cordova'
        } else {
            console.log('cordova: false')
            // check if device is mobile
            if (this.plts.indexOf('mobile') > -1) {
                console.log('mobile: true')
                this.plt = 'mobileweb'
            } else {
                console.log('mobile: false')
                // platform is 'core'
            }
        }
    }

    // function which returns the current platform
    getPlatform() {
        return this.plt
    }
}
