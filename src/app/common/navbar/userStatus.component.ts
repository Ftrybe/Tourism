import { Component, OnInit } from '@angular/core';
import { SignComponent } from 'src/app/dialog/sign';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MatDialog } from '@angular/material';


@Component({
    selector: 'app-user-status',
    templateUrl: './userStatus.component.html',
    styleUrls: ['./userStatus.component.scss']
})
export class UserStatusComponent implements OnInit {

    public username: string;
    public isLogin: boolean;
    public dialogRef;
    public menu: string;
    ngOnInit(): void {
        this.isLogin = this.authenticationService.isLoggedIn();
        if (this.isLogin) {
            this.username = this.authenticationService.getUsername();
        }
        this.username = '长将依旧心还在' ;
    }
    constructor(
        private authenticationService: AuthenticationService,
        private dialog: MatDialog,
    ) { }
    // 退出登录
    logout() {
      console.log('退出');
        this.authenticationService.logout();
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
          //  this.dialog.getDialogById('signDialog').componentInstance.isLogin.subscribe(status => this.isLogin = status);
        }
    }
}
