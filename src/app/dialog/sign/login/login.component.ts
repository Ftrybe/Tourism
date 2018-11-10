import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output()
  loginState = new EventEmitter();
  
  constructor(
    private authenticationService:AuthenticationService,
    private router:Router,
    private dialog:MatDialog) {}


  ngOnInit() {
    
  }

  //登录修改。关闭浏览器后需要重新登录


  onSubmit(form){
    this.authenticationService.login(form.value.username, form.value.password)
      .subscribe(result => {
        if (result) {
            this.loginState.emit(true);
            this.dialog.getDialogById("signDialog").close();
        } else {
          // login failed
          console.log(this.router.url);
        }
      });
  }
}
