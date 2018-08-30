import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { TabAll } from './tabs/all';
import { TabFavs } from './tabs/favs';

import { IhymnsSpanishOne, ShymnsSpanishOne } from "../../services/hymnsSpanishOne";

@IonicPage({
  name: 'page-list',
  segment: 'list',
  priority: 'high'
})
@Component({
  templateUrl: 'list.html'
})
export class ListPage {
  error: any;
  tabAll: any;
  tabFavs: any;
  loader: any;
  hymnsSpanishOne: IhymnsSpanishOne[] = [];

  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public shymnsSpanishOne: ShymnsSpanishOne,
    public loadingCtrl: LoadingController,
    public events: Events,
    public translate: TranslateService,
    public storage: Storage
  ) {
    this.tabAll = TabAll;
    this.tabFavs = TabFavs;
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
    events.subscribe('moreAllHymns', (searchText, scroll) => {
      this.getAllHymns(searchText, scroll);
    });
    events.subscribe('filterAllHymns', (searchText, scroll) => {
      if (!searchText && !scroll)
        this.hymnsSpanishOne = [];
      this.getAllHymns(searchText, scroll);
    });
  }

  activeTab(tab: string) {
    this.loader = this.loadingCtrl.create();
    this.loader.present();
    switch (tab) {
      case "all":
        // this.events.publish('reloadAllHymns', []);
        this.getAllHymns();
        break;
      case "favs":
        this.getFavsHymns();
        this.events.publish('reloadFavsHymns', []);
        break;
    }
  }

  getAllHymns(filterText?: string, scroll?: boolean) {
    let all = this.shymnsSpanishOne.getAll(this.translate.currentLang, false, this.hymnsSpanishOne.length, filterText);
    if (all instanceof Promise)
      all.then((data) => {
        this.hymnsSpanishOne = (scroll ? this.hymnsSpanishOne.concat(data) : data);
        this.loader.dismiss();
        this.events.publish('reloadAllHymns', this.hymnsSpanishOne);
      }).catch((error) => { this.error = error });
    else this.error = all;
  }

  getFavsHymns() {
    let all = this.shymnsSpanishOne.getAll(this.translate.currentLang, true);
    if (all instanceof Promise)
      all.then((data) => {
        this.hymnsSpanishOne = data;
        this.loader.dismiss();
        this.events.publish('reloadFavsHymns', this.hymnsSpanishOne);
      }).catch((error) => { this.error = error });
    else this.error = all;
  }
}
