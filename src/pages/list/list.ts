import { Component, ViewChild } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController, Events, Tabs } from 'ionic-angular';
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
  @ViewChild('listTabs') listTabs: Tabs;
  error: any;
  tabAll: any;
  tabFavs: any;
  loader: any;
  hymnsAll: IhymnsSpanishOne[] = [];
  hymnsFavs: IhymnsSpanishOne[] = [];

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
      if (!scroll)
        this.hymnsAll = [];
      this.getAllHymns(searchText, scroll);
    });

    events.subscribe('moreFavsHymns', (searchText, scroll) => {
      this.getFavsHymns(searchText, scroll);
    });
    events.subscribe('filterFavsHymns', (searchText, scroll) => {
      if (!scroll)
        this.hymnsFavs = [];
      this.getFavsHymns(searchText, scroll);
    });
  }

  getAllHymns(filterText?: string, scroll?: boolean) {
    this.loader = this.loadingCtrl.create();
    this.loader.present();
    let all = this.shymnsSpanishOne.getAll(this.translate.currentLang, false, this.hymnsAll.length, filterText);
    if (all instanceof Promise)
      all.then((data) => {
        this.hymnsAll = (scroll ? this.hymnsAll.concat(data) : data);
        this.events.publish('reloadAllHymns', this.hymnsAll);
        this.loader.dismiss();
      }).catch((error) => { this.error = error });
    else this.error = all;
  }

  getFavsHymns(filterText?: string, scroll?: boolean) {
    this.loader = this.loadingCtrl.create();
    this.loader.present();
    let favs = this.shymnsSpanishOne.getAll(this.translate.currentLang, true, this.hymnsFavs.length, filterText);
    if (favs instanceof Promise)
      favs.then((data) => {
        this.hymnsFavs = (scroll ? this.hymnsFavs.concat(data) : data);
        this.events.publish('reloadFavsHymns', this.hymnsFavs);
        this.loader.dismiss();
      }).catch((error) => { this.error = error });
    else this.error = favs;
  }
}
