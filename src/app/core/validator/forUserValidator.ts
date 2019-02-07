import {FormControl, ValidatorFn, FormGroup} from '@angular/forms';

export function forMobileValidator(len: number): ValidatorFn {
  return (control: FormControl): any => {

    if (control.value.length >= len) {
      const myreq = /^1(3|4|5|7|8)\d{9}$/;
      const valid = myreq.test(control.value);
      return valid ? null : {mobile: true};
    } else {
      return null;
    }

  };
}

export function forEqualValidator(): ValidatorFn {
  return (group: FormGroup): any => {
    const password: FormControl = group.get('password') as FormControl;
    const pconfirm: FormControl = group.get('pconfirm') as FormControl;
    const valid: boolean = (password.value === pconfirm.value);
    return valid ? null : {equal: true};
  };
}

export function forSMSCodeValidator(): ValidatorFn {
  return (control: FormControl): any => {
    const myreq = /^\d{4}$/;
    const valid = myreq.test(control.value);
    return valid ? null : {code: true};
  };
}

export function forPasswordValidator(): ValidatorFn {
  return (control: FormControl): any => {
    const myreq = /^[a-zA-Z]\w{5,17}$/;
    const valid = myreq.test(control.value);
    return valid ? null : {password: true};
  };
}


