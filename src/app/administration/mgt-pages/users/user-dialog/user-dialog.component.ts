import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../core/models/user';
import {forMobileValidator} from '../../../../core/validator/forUserValidator';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;
  public colors = [
    {value: 'gradient-purple', viewValue: 'Purple'},
    {value: 'gradient-indigo', viewValue: 'Indigo'},
    {value: 'gradient-teal', viewValue: 'Teal'},
    {value: 'gradient-blue', viewValue: 'Blue'},
    {value: 'gradient-orange', viewValue: 'Orange'},
    {value: 'gradient-green', viewValue: 'Green'},
    {value: 'gradient-pink', viewValue: 'Pink'},
    {value: 'gradient-red', viewValue: 'Red'},
    {value: 'gradient-amber', viewValue: 'Amber'},
    {value: 'gradient-gray', viewValue: 'Gray'},
    {value: 'gradient-brown', viewValue: 'Brown'},
    {value: 'gradient-lime', viewValue: 'Lime'}
  ];
  public list = [];

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User,
              public fb: FormBuilder) {
    this.form = this.fb.group({
      id: null,
      username: ['', Validators.compose([Validators.required, Validators.minLength(11), forMobileValidator(11)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      nickname: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      email: [''],
      sex: null,
      birthday: null,
      declaration: [''],
      enabled: [''],
      picture: null,
    });
  }

  ngOnInit() {
    if (this.user) {
      this.user.birthday = new Date(this.user.birthday);
      this.form.patchValue(this.user);
    } else {
      this.user = new User();
    }
  }
  close(): void {
    this.dialogRef.close();
  }


}
