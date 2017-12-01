import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TvModePage } from './tv-mode';

@NgModule({
  declarations: [
    TvModePage,
  ],
  imports: [
    IonicPageModule.forChild(TvModePage),
  ],
})
export class TvModePageModule {}
