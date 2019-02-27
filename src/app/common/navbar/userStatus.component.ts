import {Component, OnDestroy, OnInit} from '@angular/core';
import {SignComponent} from 'src/app/dialog/sign';
import {MatDialog} from '@angular/material';
import {UsersService} from '../../core/services/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotePublishDialogComponent} from '../../dialog/note-publish-dialog/note-publish-dialog.component';


@Component({
  selector: 'app-user-status',
  templateUrl: './userStatus.component.html',
  styleUrls: ['./userStatus.component.scss']
})
export class UserStatusComponent implements OnInit, OnDestroy {

  public username: string;
  public uid: string;
  public isLogin: boolean;
  public dialogRef;
  public menu: string;
  public userSubscribe;
  public dialogSubscribe;

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    if (this.usersService.getUser()) {
      this.isLogin = true;
      this.username = this.usersService.getUser().sub;
      this.uid = this.usersService.getUserId();
    }
  }

  // 退出登录
  logout() {
    this.usersService.logout();
    this.isLogin = false;
  }

  openDialog() {
    // 防止多开登录窗口
    if (this.dialogRef) {
      this.dialog.getDialogById('signDialog').close();
    } else {
      this.dialogRef = this.dialog.open(SignComponent, {
        id: 'signDialog'
      });
      this.dialogRef.afterClosed().subscribe(result => {
        this.dialogRef = '';
      });
      // 获取子组件传来得登录状态
      this.dialogSubscribe = this.dialog.getDialogById('signDialog').componentInstance.isLogin.subscribe(status => {
        this.isLogin = status;
        this.username = this.usersService.getUser().sub;
      });
    }
  }

  openPublishDialog() {
    this.dialog.closeAll();
    this.dialog.open(NotePublishDialogComponent, {
      width: 800
    });
  }

  ngOnDestroy(): void {
    this.dialogRef ? this.dialogRef.unsubscribe() : console.log('');
    this.userSubscribe ? this.userSubscribe.unsubscribe() : console.log('');
  }
}
