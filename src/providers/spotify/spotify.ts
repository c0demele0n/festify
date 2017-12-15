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
  // holds spotify credentials
  config: any

  // api token from successful login
  accessToken: string

  // set credentials and token
  constructor(public http: HttpClient, public plt: Platform) {
    this.config = {
      clientID: '2d3395530b5641dba4f40c4571465621',
      scope: 'user-read-private user-read-email',
      redirectURI: plt.is('mobile') ? 'festion://' : 'http://localhost:8100'
    }
    this.setAccessToken()
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

  // get and set access token from url
  setAccessToken(url = window.location.href) {
    const tokens = url.split('#')
    if (tokens.length <= 1) return

    const hash = tokens[tokens.length - 1]
    const token = hash.split('&')[0].replace('access_token=', '')
    this.accessToken = token
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
    const authorization = 'Bearer ' + this.accessToken
    const header = new HttpHeaders({ Authorization: authorization })

    const result = await new Promise(resolve => {
      this.http.get(url, { headers: header }).subscribe(data => resolve(data), err => console.log(err))
    })
    return (result as any).tracks.items
  }
}
