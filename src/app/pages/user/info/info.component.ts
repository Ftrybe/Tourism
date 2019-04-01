import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {User} from '../../../core/models/user';
import {UsersService} from '../../../core/services/users.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  color = 'blue';
  checked: boolean = false;
  isEdit: boolean = false;
  formModule: FormGroup;
  @Input() public user: User;

  constructor(private fb: FormBuilder, private userService: UsersService, private snackBar: MatSnackBar) {
    this.formModule = this.fb.group({
      id: null,
      nickname: [''],
      sex: [''],
      email: [''],
      birthday: ['']
    });
    this.formModule.disable();
  }

  ngOnInit() {
    this.user.birthday = new Date(this.user.birthday);
    this.formModule.patchValue(this.user);
  }

  onSubmit() {
    this.userService.changeInfo(this.formModule.value).subscribe(
      data => {
        data ? this.changeSuccess() : this.getSnackBar('保存失败');
      }
    );
  }

  changeSuccess() {
    this.getSnackBar('保存成功');
    this.userService.refreshInfo(this.formModule.value);
  }

  getSnackBar(message) {
    this.snackBar.open(message, '关闭', {
      duration: 3000
    });
  }

  switch() {
    this.formModule.disabled ? this.formModule.enable() : this.formModule.disable();
    this.isEdit = !this.formModule.disabled;
  }
}
