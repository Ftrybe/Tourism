import {ApplicationRef, ChangeDetectorRef, Component, ComponentRef, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {SignComponent} from 'src/app/dialog/sign';
import {MatDialog} from '@angular/material';
import {UsersService} from '../../core/services/users.service';
import {User} from '../../core/models/user';
import {NoteReplyService} from '../../core/services/note-reply.service';
import {AjaxResponse} from '../../core/models/ajax-response';


@Component({
  selector: 'app-user-status',
  templateUrl: './userStatus.component.html',
  styleUrls: ['./userStatus.component.scss'],
})
export class UserStatusComponent implements OnInit, OnDestroy {
  // 登录
  public isLogin: boolean;
  public dialogRef;
  public menu: string;
  public user: User;
  public countUnread: number;

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private replyService: NoteReplyService
  ) {
  }

  ngOnInit(): void {
    // 更新信息
    if (this.usersService.isLoggedIn()) {
      this.usersService.change.subscribe(
        (data: User) => {
          if (data) {
            if (data.picture) {
              this.user.picture = data.picture;
            }
            if (data.nickname) {
              this.user.nickname = data.nickname;
            }
            this.cd.detectChanges();
          }
          this.getNews();
        }
      );
      this.getNews();
      this.getUser();
    }
  }

  // 退出登录
  logout() {
    this.usersService.logout();
    this.isLogin = false;
  }

  getUser() {
    // 登录信息验证
    this.usersService.getSelf().subscribe(
      (data: User) => {
        if (data) {
          this.isLogin = true;
          this.user = data;
          this.cd.detectChanges();
        }
      }
    );
  }

  // 登录窗口
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
    }
  }

  ngOnDestroy(): void {
  }

  getNews() {
    this.replyService.countUnread().subscribe(
      (data: AjaxResponse<number>) => {
        this.countUnread = data.data;
        this.cd.detectChanges();
      }
    );
  }
}
