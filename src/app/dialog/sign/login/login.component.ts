import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {forMobileValidator, forPasswordValidator} from '../../../core/validator/forUserValidator';
import {UsersService} from '../../../core/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // 登录数据模块
  formModel: FormGroup;
  loginService;
  // 登录失败提示
  isValid: boolean;

  constructor(
    private userService: UsersService,
    private dialog: MatDialog,
    private fb: FormBuilder) {
    this.formModel = fb.group({
      username: ['', [Validators.required, Validators.minLength(11), forMobileValidator(11)]],
      password: ['', [Validators.required, forPasswordValidator()]],
    });
  }


  ngOnInit() {
  }

  // 登录修改。关闭浏览器后需要重新登录

  onSubmit() {
    // const user: User = this.formModel.value;
    this.loginService = this.userService.login(this.formModel.value).subscribe(result => {
      if (result) {
        // this.userService.decodeToken();
       // this.loginState.emit(true);
        this.userService.changeLoginState(true);
       // this.userService.getSelf().subscribe();
        this.dialog.getDialogById('signDialog').close();
      } else {
        this.isValid = true;
        setTimeout(() => {
          this.isValid = false;
        }, 3000);
      }
    });
  }
}
