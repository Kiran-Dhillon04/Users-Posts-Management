import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  selectedLanguage:string = 'en';
  notificationsEnabled:boolean = true;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.selectedLanguage = localStorage.getItem('language') || 'en';
    this.notificationsEnabled = localStorage.getItem('notifications') === 'false' ? false : true;

    this.translate.use(this.selectedLanguage);
  }

  changeLanguage() {
    this.translate.use(this.selectedLanguage);
    localStorage.setItem('language', this.selectedLanguage);
  }

  toggleNotifications() {
    localStorage.setItem('notifications', this.notificationsEnabled.toString());
  }
}
