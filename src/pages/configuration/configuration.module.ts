import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ConfigurationPage } from './configuration';

import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    ConfigurationPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfigurationPage),
    SharedModule
  ],
  entryComponents: [
    ConfigurationPage
  ]
})
export class ConfigurationPageModule { }
