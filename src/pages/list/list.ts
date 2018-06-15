import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IHimno, Himno } from "./himno";
import { ItemDetailPage } from "../itemDetail/itemDetail";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: IHimno[];
  himno: Himno;
  himnos: IHimno[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];
    this.himno = new Himno();

    this.initializeItems();
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  initializeItems() {
    this.items = this.himno.Himnos;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item, index) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1) || item.number === parseInt(val);
      })
    }
  }
}
