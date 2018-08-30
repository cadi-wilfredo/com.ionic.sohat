import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntroPage } from './intro';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    IntroPage,
  ],
  imports: [
    IonicPageModule.forChild(IntroPage), SharedModule
  ],
  entryComponents: [
    IntroPage
  ]
})
export class IntroPageModule { }
