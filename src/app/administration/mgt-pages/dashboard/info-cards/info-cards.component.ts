import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {DashboardService} from '../../../../core/services/dashboard.service';
import {AjaxResponse} from '../../../../core/models/ajax-response';
import {ChartsData} from '../../../../core/models/charts-data';

@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.scss']
})
export class InfoCardsComponent implements OnInit, OnDestroy, AfterViewChecked {
  public users: any[] = [];
  public notes: any[] = [];
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
  }


  ngOnDestroy() {
  }

  getListUsers() {
    this.dashboardService.listUserByHalfMonth().subscribe(
      (data: AjaxResponse<ChartsData[]>) => {
        this.users = data.data;
      }
    );
  }

  getListNotes() {
    this.dashboardService.listNoteByHalfMonth().subscribe(
      (data: AjaxResponse<ChartsData[]>) => {
        this.notes = data.data;
      }
    );
  }

  addEmptyTime() {

  }

  ngAfterViewChecked() {
    if (this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth) {
      setTimeout(() => this.getListNotes());
      setTimeout(() => this.getListUsers());

    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }

}
