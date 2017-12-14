import { HttpClient, HttpHeaders } from '@angular/common/http'
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

  /* wait for Spotify to return tracks for query
     call in async function:
     let result = await this.spotify.getTracks(query)
  */
  async getTracks(searchQuery) {
    const query = encodeURIComponent(searchQuery)
    const url = `https://api.spotify.com/v1/search?q=${query}&type=track`
    const authorization = 'Bearer ' + this.accessToken
    const header = new HttpHeaders({ Authorization: authorization })

    const result = await new Promise(resolve => {
      this.http.get(url, { headers: header }).subscribe(data => resolve(data), err => console.log(err))
    })
    // TODO: define structure results - code works!
    return result.tracks.items
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
