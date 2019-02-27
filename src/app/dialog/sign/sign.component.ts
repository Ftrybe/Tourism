import {Component, EventEmitter, OnInit, Output} from '@angular/core';

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
    this.isLogin.emit(true);
  }
  changeIndexEvent(data){
    this.index = data;
  }
  onLogined(arg: boolean) {
    arg ? this.index = 0 : this.index = 1;
  }
}

