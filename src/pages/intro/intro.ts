import { Component, ViewChild } from '@angular/core';
import { App, NavController, LoadingController, Slides, IonicPage } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { HomePage } from "../home/home";
@IonicPage({
  name: 'page-intro',
  segment: 'intro',
  priority: 'high'
})
@Component({
  selector: "page-intro",
  templateUrl: 'intro.html',
  // styleUrls: ['intro.scss']
  styleUrls: ['/src/pages/intro/intro.scss']
})
export class IntroPage {
  error = [];
  @ViewChild(Slides) slides: Slides;
  skipBtn = 'skip';
  state: string = '*';
  firstStart = null;
  constructor(
    public app: App,
    public navCtrl: NavController,
    public file: File,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public storage: Storage
  ) {
    this.storage.get('firstStart').then((val) => {
      if (typeof val === 'boolean') this.navCtrl.setRoot(HomePage);
      else this.firstStart = true;
    }).catch(error => {
      this.firstStart = true;
    });
  }

  skip() {
    this.storage.set('firstStart', false).then((val) => { });
    this.navCtrl.setRoot(HomePage);
  }

  slideChanged() {
    if (this.slides.isEnd()) {
      this.skipBtn = 'aigi'
    }
  }
}
