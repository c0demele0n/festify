import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AlertController } from 'ionic-angular';

/**
 * Generated class for the QueuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-queue',
  templateUrl: 'queue.html',
})
export class QueuePage {
  Code:any=504215;

  constructor(public navCtrl: NavController, public navParams: NavParams, /*private alertCtrl: AlertController*/) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QueuePage');
    
  }
  shareLink()
  {
    /*let alert = this.alertCtrl.create({
      title: 'Fehlermeldung',
      subTitle: 'Funktion fehlt noch!',
      buttons: ['OK']
    });
    alert.present();*/
    
  }

}
