import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, Content, ToastController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ItemDetailPage } from "../itemDetail/itemDetail";
import { IhymnsSpanishOne, ShymnsSpanishOne } from "../../../services/hymnsSpanishOne";

@Component({
  templateUrl: './favs.html'
})
export class TabFavs {
  @ViewChild(Content) content: Content;
  error: any;
  hymnsFavs: IhymnsSpanishOne[] = [];
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
    events.subscribe('reloadFavsHymns', data => {
      this.hymnsFavs = data;
    });
    events.subscribe('toggleFavs', (item) => {
      let index = this.hymnsFavs.findIndex((hymn: IhymnsSpanishOne, pos: number) => {
        if (hymn.id === item.id) {
          this.hymnsFavs.splice(pos, 1);
          return true;
        } return false;
      })
      if (index < 0) {
        this.hymnsFavs.push(item);
        this.hymnsFavs.sort((hymn1, hymn2) => { if (hymn1.id > hymn2.id) return hymn1.id; else hymn2.id; });
      }
    });
    this.events.publish('filterFavsHymns', false, false);
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
      this.events.publish('filterFavsHymns', this.searchText, false);
    else {
      this.events.publish('filterFavsHymns', false, false);
    }
  }

  doInfinite(infiniteScroll) {
    if (this.searchText && this.searchText.trim() !== "")
      this.events.publish('moreFavsHymns', this.searchText, true);
    else {
      this.events.publish('moreFavsHymns', false, true);
    }
    this.events.subscribe('reloadFavsHymns', (data) => {
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
    let favs = this.shymnsSpanishOne.toggleFavorite(item, this.translate.currentLang);
    if (favs instanceof Promise)
      favs.then(data => {
        this.toastCtrl.create({
          message: (!item.favorite ? "It was removed from favorites..." : "It was added to favorites..."),
          duration: 1500
        }).present();
        this.events.publish('toggleFavs', data);
      }).catch((error) => {
        this.error = error
      });
    else this.error = favs;
  }

  removeBR(text: string) {
    return text.replace('<br/>', ' ');
  }
}
