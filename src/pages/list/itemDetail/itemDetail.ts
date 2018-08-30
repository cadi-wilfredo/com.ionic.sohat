import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { NavController, NavParams, PopoverController, ViewController, LoadingController } from 'ionic-angular';
import { IhymnsSpanishOne, ShymnsSpanishOne } from "../../../services/hymnsSpanishOne";
import { Media, MediaObject } from '@ionic-native/media';

@Component({
  templateUrl: 'popover.html',
  styleUrls: ['/src/pages/list/itemDetail/popover.scss']
  // styleUrls: ['popover.scss']
})
export class PopoverPage {
  html: HTMLMetaElement
  viewCtrl: ViewController;
  hymnContent: any;
  hymnText: any;
  fontSize: number;
  theme: string;
  colors: any;

  constructor(
    public navParams: NavParams
  ) {
    if (this.navParams.data) {
      this.hymnContent = this.navParams.data.hymnContent.nativeElement;
      this.hymnText = this.navParams.data.hymnText.nativeElement;
      this.colors = this.navParams.data.colors;
      this.fontSize = this.navParams.data.fontSize;
      this.theme = this.navParams.data.theme;
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  changeBackground(theme: any) {
    this.theme = theme;
    this.hymnContent.style.backgroundColor = this.colors[theme].bg;
    this.hymnText.style.color = this.colors[theme].fg;
  }

  sumFontSize(): void {
    if (this.fontSize < 8)
      this.hymnText.style.fontSize = `${++this.fontSize}vw`;
  }

  restFontSize(): void {
    if (this.fontSize > 3)
      this.hymnText.style.fontSize = `${--this.fontSize}vw`;
  }


}

@Component({
  selector: 'item-detail',
  templateUrl: 'itemDetail.html'
})
export class ItemDetailPage {
  @ViewChild('content', { read: ElementRef }) hymnContent: ElementRef;
  @ViewChild('text', { read: ElementRef }) hymnText: ElementRef;
  selectedItem: IhymnsSpanishOne;
  content: SafeHtml;
  fontSize: number = 3;
  theme: string = 'white';
  colors: any = {
    'white': { 'bg': 'rgb(255, 255, 255)', 'fg': 'rgb(0, 0, 0)' },
    'tan': { 'bg': 'rgb(249, 241, 228)', 'fg': 'rgb(0, 0, 0)' },
    'grey': { 'bg': 'rgb(76, 75, 80)', 'fg': 'rgb(193, 212, 246)' },
    'black': { 'bg': 'rgb(0, 0, 0)', 'fg': 'rgb(255, 255, 255)' },
  };
  loadedDownload: string;
  canDownload: boolean = false;
  currentPosition: number;
  currentPositionTime: string = "--:--";
  mediafile: MediaObject;
  mediaStatus: number = 0;
  mediaDuration: number;
  mediaDurationTime: string = "--:--";
  musicInterval: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public domsanitizer: DomSanitizer,
    public popoverCtrl: PopoverController,
    public translate: TranslateService,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public file: File,
    public media: Media,
    public transfer: FileTransfer,
    public shymnsSpanishOne: ShymnsSpanishOne,
  ) {
    this.selectedItem = navParams.get('item');
    this.shymnsSpanishOne.setOpenAt(this.selectedItem, this.translate.currentLang);
    this.content = domsanitizer.bypassSecurityTrustHtml(this.selectedItem.lyrics)
    this.storage.get('fontSize').then(val => {
      if (val)
        this.fontSize = val;
      else
        this.fontSize = 3;
    });
    this.storage.get('theme').then(val => {
      if (val) {
        this.theme = val;
        this.hymnContent.nativeElement.style.backgroundColor = this.colors[val].bg;
        this.hymnText.nativeElement.style.color = this.colors[val].fg;
      } else {
        this.hymnContent.nativeElement.style.backgroundColor = this.colors[this.theme].bg;
        this.hymnText.nativeElement.style.color = this.colors[this.theme].fg;
      }
    });
    this.file.checkFile(this.file.externalDataDirectory + 'hymns/', 'music1.m4a')
      .then(exist => {
        this.canDownload = !exist;
        this.mediafile = this.media.create(this.file.externalDataDirectory + 'hymns/music1.m4a');
      }).catch(error => { this.canDownload = true; });
  }

  ionViewWillLeave() {
    clearInterval(this.musicInterval);
  }

  playMusic() {
    this.musicInterval = setInterval(() => {
      this.mediaDuration = this.mediafile.getDuration();
      this.mediaDurationTime = this.toHour(this.mediafile.getDuration());
      this.mediafile.getCurrentPosition().then((position) => {
        this.currentPositionTime = this.toHour(position);
        this.currentPosition = ((position * 100) / this.mediaDuration);
        if (position <= 0) {
          this.currentPositionTime = "--:--";
        }
      });
    }, 1000);
    this.mediafile.onStatusUpdate.subscribe(status => {
      this.mediaStatus = status;
    });
    this.mediafile.play();
  }

  toHour(time): string {
    let hours: string | number = Math.floor(time / 3600);
    let minutes: string | number = Math.floor((time % 3600) / 60);
    let seconds: any = parseInt((time % 60) + '');
    //Anteponiendo un 0 a los minutos si son menos de 10 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    //Anteponiendo un 0 a los segundos si son menos de 10 
    seconds = (seconds < 10 ? '0' + seconds : seconds);
    return (hours != 0 ? (hours + ":") : '') + minutes + ":" + seconds;  // 2:41:30
  }
  pauseMusic() {
    this.mediafile.pause();
  }
  stopMusic() {
    this.mediafile.stop();
    this.currentPosition = 0;
    clearInterval(this.musicInterval);
    this.currentPositionTime = "--:--";
  }
  seekMusic() {
    this.mediafile.seekTo(((this.mediaDuration * this.currentPosition) / 100) * 1000);
  }

  downloadMusic(): void {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = 'http://10.42.0.1/music1.m4a';
    let loading = this.loadingCtrl.create({
      content: `Downloaded 0% of 100%`
    });
    loading.present();

    fileTransfer.download(url, this.file.externalDataDirectory + 'hymns/music1.m4a').then((entry) => {
      this.canDownload = false;
      loading.dismiss();
      this.file.checkFile(this.file.externalDataDirectory + 'hymns/', 'music1.m4a')
        .then(exist => {
          this.canDownload = !exist;
          this.mediafile = this.media.create(this.file.externalDataDirectory + 'hymns/music1.m4a');
        }).catch(error => { this.canDownload = true; });
    }, (error) => {
      loading.dismiss();
      this.canDownload = true;
    });
    fileTransfer.onProgress((data) => {
      this.loadedDownload = ((data.loaded * 100) / data.total).toFixed(0);
      setTimeout(() => {
        loading.setContent(`Downloaded ${this.loadedDownload}% of 100%`);
      }, 500);
    });
  }

  presentPopover(event: UIEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, {
      hymnContent: this.hymnContent,
      hymnText: this.hymnText,
      colors: this.colors,
      fontSize: this.fontSize,
      theme: this.theme
    });
    popover.present({
      ev: event
    });
  }
}
