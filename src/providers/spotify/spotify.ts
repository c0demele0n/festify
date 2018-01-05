import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Events, AlertController } from 'ionic-angular'

// page imports
import { NavPage } from '../../pages/nav/nav'

// provider imports
import { PlatformServiceProvider } from '../platform-service/platform-service'

@Injectable()
export class SpotifyProvider {
  // holds spotify credentials and api call params
  private config: any

  // api token from successful login
  private accessToken: string

  // dev toggle for allowing noPremium Accounts to create a party
  private allowNoPremium: boolean = true

  constructor(
    public http: HttpClient,
    public plt: PlatformServiceProvider,
    public events: Events,
    public alertCtrl: AlertController
  ) {
    // set credentials and token
    this.config = {
      clientID: '2d3395530b5641dba4f40c4571465621',
      scope: 'user-read-private user-read-email',
      redirectURI: plt.getPlatform() == 'cordova' ? 'festion://' : 'http://localhost:8100'
    }
    this.config.clientID = encodeURIComponent(this.config.clientID)
    this.config.scope = encodeURIComponent(this.config.scope)
    this.config.redirectURI = encodeURIComponent(this.config.redirectURI)

    // this.setAccessToken()
  }

  // function which inits the spotify connection and returns true | false
  async init(url?: string) {
    // alert('init() >> started')
    // check if user is already logged in (check for access token)
    if (this.isLoggedIn() == true) {
      //   alert('you are already logged in')
      // if user is already logged in --> check for premium status
      const premium = await this.hasPremium()
      if (this.allowNoPremium ? false : !premium) {
        // alert('no premium')
        //   this.createSpotifyAlert()
      } else {
        // alert('you are premium')
        return true
      }
    } else {
      // if no user is logged in --> call login() function
      this.login()
    }
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
    if (tokens.length <= 1) return false

    const hash = tokens[tokens.length - 1]
    const token = hash.split('&')[0].replace('access_token=', '')
    this.accessToken = token

    return true
  }

  removeAccessToken() {
    this.accessToken = ''
    window.location.href =
      this.plt.getPlatform() == 'cordova' ? 'festion://' : 'http://localhost:8100'
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

  // private function to uniform API calls to Spotify
  async _apiCall(url) {
    const authorization = 'Bearer ' + this.accessToken
    const header = new HttpHeaders({ Authorization: authorization })

    const result = await new Promise(resolve => {
      this.http
        .get(url, { headers: header })
        .subscribe(data => resolve(data), err => this.events.publish('SpotifyError', err))
    })

    return result
  }
}
