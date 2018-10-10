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
  hymnsAll: IhymnsSpanishOne[] = [];
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
      this.hymnsAll = data;
    });
    events.subscribe('toggleFavs', (item) => {
      this.hymnsAll
        .filter(hymn => hymn.id === item.id)
        .map(hymn => { console.log('a', hymn.favorite); hymn.favorite = item.favorite });
    });
    this.events.publish('filterAllHymns', false, false);
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  filterHymns(ev: any) {
    this.searchText = ev.target.value;
    this.content.scrollToTop();
    if (this.searchText && this.searchText.trim() !== "")
      this.events.publish('filterAllHymns', this.searchText, false);
    else {
      this.events.publish('filterAllHymns', false, false);
    }
  }

  doInfinite(infiniteScroll) {
    if (this.searchText && this.searchText.trim() !== "")
      this.events.publish('moreAllHymns', this.searchText, true);
    else {
      this.events.publish('moreAllHymns', false, true);
    }
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
          text: 'Yes', handler: () => {
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
      all.then(data => {
        item = data;
        this.toastCtrl.create({
          message: (!item.favorite ? "It was removed from favorites..." : "It was added to favorites..."),
          duration: 1500
        }).present();
        this.events.publish('toggleFavs', data);
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
