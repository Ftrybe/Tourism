import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html'

})
export class SignComponent implements OnInit {
  @Output()
  isLogin = new EventEmitter<Boolean>();

  index: number;
  ngOnInit() {
    this.index = 0;
  }

  onLogin(arg: boolean) {
    this.isLogin.emit(arg);
  }
}

