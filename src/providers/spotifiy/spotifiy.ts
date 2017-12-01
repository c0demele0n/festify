import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SpotifiyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpotifiyProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SpotifiyProvider Provider');
  }

}
