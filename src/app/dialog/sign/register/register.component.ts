import {Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, Renderer2, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {forEqualValidator, forMobileValidator, forPasswordValidator, forSMSCodeValidator} from '../../../core/validator/forUserValidator';
import {UsersService} from '../../../core/services/users.service';
import {AsyncUserValidator} from '../../../core/validator/async-user-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  // 数据组
  formModel: FormGroup;
  // 用于取消订阅
  userUnsubscribe;
  smsUnsubscribe;
  // 注册失败提示
  isValid: boolean;
  // 防止手机号码修改注册
  phoneToken;
  // 获取验证码按钮显示文字
  smsValue;
  disabled: boolean = false;
  smsClick: boolean = false;
  @ViewChild('username')
  usernameEle: ElementRef;

  constructor(private fb: FormBuilder,
              private userService: UsersService,
              private asyncValidator: AsyncUserValidator,
              private render: Renderer2) {
    this.formModel = fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(11), forMobileValidator(11)]),
        this.asyncValidator.mobileExistValidator()],
      passwordGroup: fb.group({
        password: ['', [Validators.required, forPasswordValidator()]],
        pconfirm: ['', [Validators.required]]
      }, {validator: forEqualValidator()}),
      smsCode: ['', forSMSCodeValidator()]
    });
  }

  @Output()
  state = new EventEmitter();

  ngOnInit() {
    this.smsValue = '获取验证码';
  }

  onSubmit() {
    const arr = [this.formModel.get('username').value, this.formModel.get('passwordGroup.password').value,
      this.formModel.get('passwordGroup.pconfirm').value,
      this.formModel.get('smsCode').value, this.phoneToken];
    this.userUnsubscribe = this.userService.register(arr).subscribe(result => {
      if (result) {
        this.state.emit(true);
        this.userUnsubscribe.unsubscribe();
      } else {
        this.isValid = true;
      }
    });
  }

  getSMSCode() {
    const username = this.formModel.get('username');
    if (username.valid) {
      this.smsUnsubscribe = this.userService.getSmsCode(username.value).subscribe(flag => {
        if (flag) {
          this.disabled = true;
          this.smsValue = 60;
          this.phoneToken = localStorage.getItem('phoneToken');
          setInterval(() => {
            if (this.smsValue > 1) {
              this.smsValue--;
            } else {
              this.smsValue = '获取验证码';
              this.disabled = false;
              return;
            }
          }, 1000);
          this.smsUnsubscribe.unsubscribe();
        }
      });
    } else {
      this.smsClick = true;
      setTimeout(() => {
        this.smsClick = false;
      }, 2000);
    }
  }

  ngOnDestroy(): void {
  }
}
