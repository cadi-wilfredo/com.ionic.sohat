import { Component, ViewChild } from '@angular/core';
import { Nav, App, Platform, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from "@ionic-native/file";
import { Storage } from '@ionic/storage';

import { IntroPage } from '../pages/intro/intro';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { AboutPage } from '../pages/about/about';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage: any = IntroPage;
  actionSheet;
  pages: Array<{ title: string, component: any, icon: string }>;
  diskSize: number;
  appSize: number = 0;
  diskFreeSpace: number = 0;
  diskSpacePorcent: number = 0;

  constructor(
    private app: App,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private actionSheetCtrl: ActionSheetController,
    private translate: TranslateService,
    private file: File,
    private storage: Storage
  ) {
    this.translate.setDefaultLang('en');
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
    this.storage.get('fontSize').then(val => {
      if (!val)
        this.storage.set('fontSize', 3);
    }).catch(error => {
      this.storage.set('fontSize', 3);
    });
    this.storage.get('theme').then(val => {
      if (!val) {
        this.storage.set('theme', 'white');
      }
    }).catch(error => {
      this.storage.set('theme', 'white');
    });

    this.platform.ready().then(() => {
      let dbname = 'hymnalbooks.db';
      let wwwPath = location.href.replace("/index.html", "") + '/';
      let fp = "database/";
      let fileDestPath = "files/";
      let basePath = wwwPath + fp;
      let copyToPath = this.file.externalApplicationStorageDirectory + fileDestPath;
      this.file.checkFile(copyToPath, dbname)
        .then(exist => {
          this.initialize();
        })
        .catch(error => {
          this.file.copyFile(basePath, dbname, copyToPath, dbname)
            .then(entry => { this.initialize(); })
            .catch(error => { })
        });
      setTimeout(() => {
        window['DiskSpacePlugin'].info({}, (data) => {
          this.diskSize = parseInt(data.total);
          this.appSize = parseInt(data.app);
          this.diskFreeSpace = parseInt(data.free);
          this.diskSpacePorcent = ((data.app * 100) / data.free);
        }, () => { });
      }, 1000);
      setInterval(() => {
        window['DiskSpacePlugin'].info({}, (data) => {
          this.diskSize = parseInt(data.total);
          this.appSize = parseInt(data.app);
          this.diskFreeSpace = parseInt(data.free);
          this.diskSpacePorcent = ((data.app * 100) / data.free);
        }, () => { });
      }, 10000);
    });

    this.statusBar.styleDefault();

    this.platform.registerBackButtonAction(() => {
      let nav = this.app.getActiveNav();
      if (nav.canGoBack()) {
        nav.pop();
      } else {
        if (nav.getActive().name === 'HomePage') {
          this.actionSheet = this.actionSheetCtrl.create({
            title: 'Do you want exit?',
            buttons: [
              {
                text: 'Yes',
                handler: () => {
                  this.platform.exitApp();
                }
              }, {
                text: 'No',
                role: 'cancel'
              }
            ]
          }).present();
        } else {
          this.navCtrl.setRoot(this.pages[0].component);
        }
      }
    });
  }

  initialize() {
    this.pages = [
      { title: 'home', component: HomePage, icon: 'home' },
      { title: 'hymns', component: ListPage, icon: 'musical-notes' },
      { title: 'settings', component: ConfigurationPage, icon: 'settings' },
      { title: 'about', component: AboutPage, icon: 'information-circle' }
    ];
    setTimeout((_ => {
      this.splashScreen.hide()
    }), 1000);
  }

  openPage(page) {
    this.navCtrl.setRoot(page.component);
  }
}
