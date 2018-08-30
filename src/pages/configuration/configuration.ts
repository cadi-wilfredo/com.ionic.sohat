import { Component } from '@angular/core';
import { NavParams, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: 'page-configuration',
  segment: 'configuration',
  priority: 'high'
})
@Component({
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {
  private lang: string;
  private langs = [
    {
      value: 'es'
    },
    {
      value: 'en'
    },
    // {
    //   value: 'de'
    // }
  ];
  private fontSize = 3;

  private theme: string = 'white';
  private colors: any = {
    'white': {
      'bg': 'rgb(255, 255, 255)',
      'fg': 'rgb(0, 0, 0)'
    },
    'tan': {
      'bg': 'rgb(249, 241, 228)',
      'fg': 'rgb(0, 0, 0)'
    },
    'grey': {
      'bg': 'rgb(76, 75, 80)',
      'fg': 'rgb(193, 212, 246)'
    },
    'black': {
      'bg': 'rgb(0, 0, 0)',
      'fg': 'rgb(255, 255, 255)'
    },
  };

  private backgroundColor;
  private color;

  constructor(
    private navParams: NavParams,
    private translate: TranslateService,
    private storage: Storage
  ) {
    this.storage.get('lang').then(val => {
      if (val)
        this.lang = val;
      else
        this.lang = this.translate.getDefaultLang();
    });

    this.storage.get('fontSize').then(val => {
      if (val)
        this.fontSize = val;
      else
        this.fontSize = 3;
    });

    this.storage.get('theme').then(val => {
      if (val) {
        this.theme = val;
        this.backgroundColor = this.colors[val].bg;
        this.color = this.colors[val].fg;
      } else {
        this.backgroundColor = this.colors[this.theme].bg;
        this.color = this.colors[this.theme].fg;
      }
    });
  }

  langChange($event) {
    this.storage.set('lang', this.lang).then(val => {
      this.translate.use(this.lang)
    }).catch(error => {
      this.lang = this.translate.currentLang;
    });
  }

  fontSizeChange($event) {
    this.storage.set('fontSize', this.fontSize);
  }

  changeTheme(theme: any) {
    this.storage.set('theme', theme).then(val => {
      this.theme = val;
      this.backgroundColor = this.colors[this.theme].bg;
      this.color = this.colors[this.theme].fg;
    });
  }
}
