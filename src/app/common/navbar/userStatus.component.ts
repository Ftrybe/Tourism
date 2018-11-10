import { Component, OnInit } from "@angular/core";
import { SignComponent } from "src/app/dialog/sign";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { MatDialog } from "@angular/material";


@Component({
    selector: 'app-user-status',
    templateUrl: './userStatus.component.html',
})
export class UserStatusComponent implements OnInit {

    public username: String;
    public isLogin: boolean;
    public dialogRef;

    ngOnInit(): void {
        this.isLogin = this.authenticationService.isLoggedIn();
        if (this.isLogin) {
            this.username = this.authenticationService.getUsername();
        } 
    }
    constructor(
        private authenticationService: AuthenticationService,
        private dialog: MatDialog,
    ) { }
    //退出登录
    logout() {
        this.authenticationService.logout();
        this.isLogin = false;
    }
    openDialog() {
        
        //防止多开登录窗口
        if (this.dialogRef) {
            this.dialog.getDialogById("signDialog").close();
        } else {
            this.dialogRef = this.dialog.open(SignComponent, {
                id: "signDialog"
            });
            this.dialogRef.afterClosed().subscribe(result => {
                this.dialogRef = "";
            });
            //获取子组件传来得登录状态
            this.dialog.getDialogById("signDialog").componentInstance.isLogin.subscribe(status => this.isLogin = status);
        }
    }
}