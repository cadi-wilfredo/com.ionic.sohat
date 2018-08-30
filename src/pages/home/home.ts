import { Component } from '@angular/core';
import { App, NavController, LoadingController, IonicPage } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { ShymnsSpanishOne, IhymnsSpanishOne } from '../../services/hymnsSpanishOne';
import { ItemDetailPage } from '../list/itemDetail/itemDetail';
@IonicPage({
  name: 'page-home',
  segment: 'home',
  priority: 'high'
})
@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  error = [];
  hymnsSpanishOne: IhymnsSpanishOne[] = [];
  constructor(
    public app: App,
    public navCtrl: NavController,
    public file: File,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public storage: Storage,
    public shymnsSpanishOne: ShymnsSpanishOne
  ) {
    this.storage.get('lang').then((val) => {
      if (val)
        this.translate.use(val);
      else {
        this.storage.set('lang', this.translate.defaultLang).then(val => {
          this.translate.use(val)
        }).catch(error => {
          this.translate.use(this.translate.defaultLang)
        });
      }
    }).catch(error => {
      this.translate.use('en');
    });
    this.getThe10Last();
  }
  ionViewWillEnter() {
    this.getThe10Last();
  }

  getThe10Last() {
    let last10 = this.shymnsSpanishOne.getLast10(this.translate.currentLang);
    if (last10 instanceof Promise)
      last10.then((data: IhymnsSpanishOne[]) => {
        this.hymnsSpanishOne = data;
      }).catch((error) => { this.error = error });
    else this.error = last10;
  }

  removeBR(text: string) {
    return text.replace('<br/>', ' ');
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }
}
