import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {BannerDialogComponent} from './banner-dialog/banner-dialog.component';
import {Banner} from '../../../../core/models/banner';
import {BannerService} from '../../../../core/services/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  public banners: Banner[];
  displayedColumns = ['title', 'topic', 'ops'];

  constructor(private dialog: MatDialog, private bannerService: BannerService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.bannerService.getAll().subscribe(
      data => {
        this.banners = data;
      }
    );
  }

  openDialog(banner): void {
    const dialogRef = this.dialog.open(BannerDialogComponent, {
      width: '1000px',
      data: banner
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUser();
    });
  }

  delete(id: number) {
    this.bannerService.delete(id).subscribe(data => {
      if (data) {
        this.getUser();
      }
    });
  }
}
