import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Events, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ItemDetailPage } from "../itemDetail/itemDetail";
import { IhymnsSpanishOne, ShymnsSpanishOne } from "../../../services/hymnsSpanishOne";

@Component({
  templateUrl: './all.html'
})
export class TabFavs {
  error: any;
  hymnsSpanishOne: IhymnsSpanishOne[] = [];
  items: IhymnsSpanishOne[] = [];

  constructor(private navCtrl: NavController,
    public navParams: NavParams,
    public shymnsSpanishOne: ShymnsSpanishOne,
    public toastCtrl: ToastController,
    public events: Events,
    public alertCtrl: AlertController,
    public translate: TranslateService
  ) {
    events.subscribe('reloadFavsHymns', (data) => {
      this.hymnsSpanishOne = data;
      this.initializeItems();
    });
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  initializeItems() {
    this.items = this.hymnsSpanishOne;
  }

  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.hymnsSpanishOne.filter((item, index) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1) || item.id === parseInt(val);
      })
    }
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

  removeBR(text: string) {
    return text.replace('<br/>', ' ');
  }
}
