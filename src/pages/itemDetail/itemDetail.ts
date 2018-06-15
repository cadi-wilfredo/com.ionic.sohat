import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavController, NavParams } from 'ionic-angular';
import { IHimno } from "../list/himno";

@Component({
  selector: 'item-detail',
  templateUrl: 'itemDetail.html'
})
export class ItemDetailPage {
  selectedItem: IHimno;
  content: SafeHtml;
  fontsize = 5;

  constructor(public navCtrl: NavController, public navParams: NavParams, domsanitizer: DomSanitizer) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.content = domsanitizer.bypassSecurityTrustHtml(this.selectedItem.content)
  }

  sumFontSize(): void {
    if (this.fontsize < 7)
      ++this.fontsize;
  }
  restFontSize(): void {
    if (this.fontsize > 2)
      --this.fontsize;
  }
}
