import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';
import { TabAll } from './tabs/all';
import { TabFavs } from './tabs/favs';
import { ItemDetailPage, PopoverPage } from './itemDetail/itemDetail';
import { SharedModule } from '../../app/shared.module';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Media } from '@ionic-native/media';

@NgModule({
  declarations: [
    ListPage, TabAll, TabFavs, ItemDetailPage, PopoverPage
  ],
  imports: [
    IonicPageModule.forChild(ListPage), SharedModule
  ],
  entryComponents: [
    ListPage, TabAll, TabFavs, ItemDetailPage, PopoverPage
  ],
  providers: [
    FileTransfer,
    Media
  ]
})
export class ListPageModule { }
