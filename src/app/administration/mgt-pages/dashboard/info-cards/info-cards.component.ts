import {Component, OnInit, ElementRef, ViewChild, OnDestroy, AfterViewInit, AfterViewChecked} from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {orders, products, customers, refunds} from '../dashboard.data';
import {DashboardService} from '../../../../core/services/dashboard.service';
import {AjaxResponse} from '../../../../core/models/ajax-response';
import {ChartsData} from '../../../../core/models/charts-data';

@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.scss']
})
export class InfoCardsComponent implements OnInit, OnDestroy, AfterViewChecked {
  public users: any;
  public notes: any;
  public colorScheme = {
    domain: ['rgba(255,255,255,0.8)']
  };
  public autoScale = true;
  @ViewChild('resizedDiv') resizedDiv: ElementRef;
  public previousWidthOfResizedDiv: number = 0;
  public settings: Settings;

  constructor(public appSettings: AppSettings, private dashboardService: DashboardService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.getListNotes();
    this.getListUsers();
  }

  public onSelect(event) {
    console.log(event);
  }


  ngOnDestroy() {
  }

  getListUsers() {
    this.dashboardService.listUserByHalfMonth().subscribe(
      (data: AjaxResponse) => {
        this.users = data.data;
        Object.assign(this, this.users);
        console.log(data);
      }
    );
  }
  getListNotes() {
    this.dashboardService.listNoteByHalfMonth().subscribe(
      (data: AjaxResponse) => {
        this.notes = data.data;
      }
    );
  }

  ngAfterViewChecked() {
    if (this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth) {
      this.getListNotes();
      this.getListUsers();

    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }

}
