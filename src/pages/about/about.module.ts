import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPage), SharedModule
  ],
  entryComponents: [
    AboutPage
  ]
})
export class AboutPageModule { }
