import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Platform, Events } from 'ionic-angular'

/*
  Generated class for the SpotifyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpotifyProvider {
  // holds spotify credentials
  config: any

  // api token from successful login
  accessToken: string
  header: HttpHeaders
  activeDevice: string

  // set credentials and token
  constructor(public http: HttpClient, public plt: Platform, public events: Events) {
    this.config = {
      clientID: '2d3395530b5641dba4f40c4571465621',
      scope: 'user-read-private user-read-email user-read-playback-state user-modify-playback-state',
      redirectURI: plt.is('mobile') ? 'festion://' : 'http://localhost:8100'
    }
    this.config.clientID = encodeURIComponent(this.config.clientID)
    this.config.scope = encodeURIComponent(this.config.scope)
    this.config.redirectURI = encodeURIComponent(this.config.redirectURI)

    this.setAccessToken()
  }

  // compose spotify login url from config and open it in browser
  login() {
    const { clientID, scope, redirectURI } = this.config

    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&scope=${scope}&redirect_uri=${redirectURI}`
    window.location.href = url
  }

  // redirect to Spotify logout url
  logout() {
    const { clientID, scope, redirectURI } = this.config

    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&scope=${scope}&redirect_uri=${redirectURI}&show_dialog=true`
    window.location.href = url
  }

  // get and set access token from url
  async setAccessToken(url = window.location.href) {
    const tokens = url.split('#')
    if (tokens.length <= 1) return

    const hash = tokens[tokens.length - 1]
    const token = hash.split('&')[0].replace('access_token=', '')
    this.accessToken = token

    const authorization = 'Bearer ' + this.accessToken
    this.header = new HttpHeaders({ Authorization: authorization })
  }

  // you are logged in if you have an access token
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

    const result = await this._apiCall(url)
    return (result as any).tracks.items
  }

  // check if user has premium account
  async hasPremium() {
    const url = `https://api.spotify.com/v1/me`

    const result = await this._apiCall(url)
    return (result as any).product == 'premium'
  }

  async getAvailableDevices() {
    const url = `https://api.spotify.com/v1/me/player/devices`

    const result = await this._apiCall(url)
    return (result as any).devices
  }

  //Fix: PUT
  async setSelectedDevice(device) {
    const url = `https://api.spotify.com/v1/me/player`

    const result = await new Promise(resolve => {
      this.http
        .put(url, { device_ids: device.id }, { headers: this.header })
        .subscribe(data => resolve(data), err => console.log(err))
    })
    this.activeDevice = device
    console.log('setSelectedDevice:', result)
    //return result
  }

  async getActiveDevice() {
    const url = `https://api.spotify.com/v1/me/player`

    const result = await this._apiCall(url)
    return (result as any).device == this.activeDevice
  }

  // private function to uniform API calls to Spotify
  async _apiCall(url) {
    console.log('apicall', this.header)
    const result = await new Promise(resolve => {
      this.http
        .get(url, { headers: this.header })
        .subscribe(data => resolve(data), err => this.events.publish('SpotifyError', err))
    })

    return result
  }
}
