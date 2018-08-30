import { NgModule } from '@angular/core';

import { IntroPageModule } from './intro/intro.module';
import { HomePageModule } from './home/home.module';
import { ListPageModule } from './list/list.module';
import { ConfigurationPageModule } from './configuration/configuration.module';
import { AboutPageModule } from './about/about.module';

@NgModule({
  imports: [
    AboutPageModule, ConfigurationPageModule,
    HomePageModule, IntroPageModule, ListPageModule
  ]
})
export class PageModule { }
