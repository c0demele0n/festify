import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Platform } from 'ionic-angular'

/*
  Generated class for the SpotifyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpotifyProvider {
  // declare spotify credentials
  config = {
    clientID: '2d3395530b5641dba4f40c4571465621',
    scope: 'user-read-private user-read-email',
    redirectURI: ''
  }

  // accessToken returned from successful login
  accessToken = this._getHashParams().access_token || false

  // set platform dependent redirectURI
  constructor(public http: HttpClient, public plt: Platform) {
    this.config.redirectURI = plt.is('mobile') ? 'festion://' : 'http://localhost:8100'
  }

  // compose spotify login url from config and open it in browser
  login() {
    let { clientID, scope, redirectURI } = this.config
    clientID = encodeURIComponent(clientID)
    scope = encodeURIComponent(scope)
    redirectURI = encodeURIComponent(redirectURI)

    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&scope=${scope}&redirect_uri=${redirectURI}`
    window.location.href = url
  }

  isLoggedIn() {
    return this.accessToken ? true : false
  }

  // extract hash parameters from current url
  _getHashParams() {
    let hashParams = { access_token: false }
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1)
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2])
    }
    return hashParams
  }
}
