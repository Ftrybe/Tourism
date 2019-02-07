import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppSettings} from './app.settings';
import {Settings} from './app.settings.model';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  public settings: Settings;

  constructor(public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
  }

}
