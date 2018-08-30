import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FileTransfer } from '@ionic-native/file-transfer';
import { Media } from '@ionic-native/media';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EmailComposer } from '@ionic-native/email-composer';

import { MyApp } from './app.component';
import { SharedModule } from './shared.module';
import { PageModule } from '../pages/page.module';
import { ShymnsSpanishOne } from '../services/hymnsSpanishOne';
import { FileSizePipe } from '../pipes/fileSize.pipe';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    FileSizePipe,
    MyApp
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      iconMode: 'md',
      preloadModules: true
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot({
      name: 'hymsdb',
      driverOrder: ['indexeddb', 'websql']
    }),
    SharedModule,
    PageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar, SplashScreen,
    EmailComposer, File, SQLite,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ShymnsSpanishOne,
    FileTransfer, Media
  ]
})
export class AppModule {
}
