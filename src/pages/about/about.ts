import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage({
  name: 'page-about',
  segment: 'about',
  priority: 'high'
})
@Component({
  templateUrl: 'about.html',
})
export class AboutPage {
  feedback_type: string;
  feedback_content: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public emailComposer: EmailComposer) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  contactMe() {
    let email = {
      to: 'wil890625.cu@gmail.com',
      subject: '',
      body: '',
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  sendFeedback() {
    let email = {
      to: 'wil890625.cu@gmail.com',
      cc: 'rccardero88@gmail.com',
      subject: this.feedback_type,
      body: this.feedback_content,
      isHtml: true
    };
    this.emailComposer.open(email);
  }

}
