import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../../../core/services/dashboard.service';
import {AjaxResponse} from '../../../../core/models/ajax-response';
import {Dashboard} from '../../../../core/models/dashboard';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit {
  dashboard: Dashboard;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.initData();

  }
  initData(){
    this.dashboardService.countAll().subscribe(
      (data: AjaxResponse) => {
        this.dashboard = data.data;
    }
    );
  }
}
