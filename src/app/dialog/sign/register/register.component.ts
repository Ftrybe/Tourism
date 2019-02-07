import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {forEqualValidator, forMobileValidator, forPasswordValidator, forSMSCodeValidator} from '../../../core/validator/forUserValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: []
})
export class RegisterComponent implements OnInit {
  formModel: FormGroup;

  constructor(fb: FormBuilder) {
    this.formModel = fb.group({
      username: ['', [Validators.required, Validators.minLength(11), forMobileValidator(11)]],
      passwordGroup: fb.group({
        password: ['', forPasswordValidator()],
        pconfirm: ['', forPasswordValidator()]
      }, {validator: forEqualValidator()}),
      smsCode: ['', forSMSCodeValidator()]
    });
  }

  @Output()
  loginState = new EventEmitter();

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.formModel.value);
  }

  getSMSCode() {

  }
}
