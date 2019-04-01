import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../core/models/user';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ImageCropperDialogComponent} from '../../dialog/image-cropper-dialog/image-cropper-dialog.component';
import {UsersService} from '../../core/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  // 选项卡索引
  index: number = 0;
  // 按顺序存放选项卡名称，方便切换选项卡
  tapMap = ['info', 'collection', 'publish', 'news'];
  user: User;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private userService: UsersService,
              private matSnackBar: MatSnackBar,
              private change: ChangeDetectorRef) {
  }

  ngOnInit() {
    // 获取用户信息
    this.route.data.subscribe(
      (data: { user: User }) => {
        this.user = data.user;
      }
    );
    // 切换导航
    this.route.queryParams.subscribe(data => {
      this.index = this.tapMap.indexOf(data.select);
    });
  }

  // 选项卡更改事件
  changeQueryParam() {
    this.router.navigate([location.pathname], {queryParams: {select: this.tapMap[this.index]}});
  }

  changeIndexEvent(data) {
    this.index = data;
  }

  ngOnDestroy(): void {
  }

  openCropperDialog() {
    const dialogRef = this.dialog.open(ImageCropperDialogComponent, {
        width: '400px',
        data: {
          title: '修改头像',
          resizeToWidth: 160,
          cropperMinWidth: 80,
          aspectRatio: 1,
          image: this.user.picture,
          maintainAspectRatio: true
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.userService.changePicture(data).subscribe(
            state => state ? this.userService.getSelf().subscribe((user) => {
                this.user = user;
                this.userService.refreshInfo(user);
              }) :
              this.matSnackBar.open('更改失败', '关闭', {duration: 3000})
          );
          this.change.markForCheck();
        }
      }
    );
  }
}
