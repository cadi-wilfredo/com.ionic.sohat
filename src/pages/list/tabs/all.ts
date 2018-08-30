import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, Content, ToastController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ItemDetailPage } from "../itemDetail/itemDetail";
import { IhymnsSpanishOne, ShymnsSpanishOne } from "../../../services/hymnsSpanishOne";

@Component({
  templateUrl: './all.html'
})
export class TabAll {
  @ViewChild(Content) content: Content;
  error: any;
  hymnsSpanishOne: IhymnsSpanishOne[] = [];
  items: IhymnsSpanishOne[] = [];
  searchText: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shymnsSpanishOne: ShymnsSpanishOne,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public events: Events,
    public alertCtrl: AlertController,
    public translate: TranslateService
  ) {
    events.subscribe('reloadAllHymns', (data) => {
      this.hymnsSpanishOne = data;
      this.initializeItems();
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  initializeItems() {
    this.items = this.hymnsSpanishOne;
  }

  filterHymns(ev: any) {
    this.searchText = ev.target.value;
    if (this.searchText && this.searchText.trim() !== "")
      this.events.publish('filterAllHymns', this.searchText.trim(), false);
    else {
      this.events.publish('filterAllHymns', false, false);
    }
  }

  doInfinite(infiniteScroll) {
    this.events.publish('moreAllHymns', this.searchText.trim(), true);
    this.events.subscribe('reloadAllHymns', (data) => {
      infiniteScroll.complete();
    });
  }

  confirmToggleFavorite(item: IhymnsSpanishOne): void {
    if (item.favorite) {
      this.alertCtrl.create({
        title: 'Quit from favorites',
        subTitle: 'Do you want quit this hymn from favorites?',
        buttons: [{
          text: 'No',
          role: 'cancel'
        }, {
          text: 'Yes', handler: data => {
            this.toggleFavorite(item);
          }
        }]
      }).present();
    } else {
      this.toggleFavorite(item);
    }
  }

  toggleFavorite(item: IhymnsSpanishOne): void {
    let all = this.shymnsSpanishOne.toggleFavorite(item, this.translate.currentLang);
    if (all instanceof Promise)
      all.then((data) => {
        this.initializeItems();
        let toast = this.toastCtrl.create({
          message: (!item.favorite ? "It was removed from favorites..." : "It was added to favorites..."),
          duration: 1500
        }).present();
      }).catch((error) => {
        this.error = error
      });
    else this.error = all;
  }

  toTop() {
    this.content.scrollToTop();
  }

  removeBR(text: string) {
    return text.replace('<br/>', ' ');
  }
}
