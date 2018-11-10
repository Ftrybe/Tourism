import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html'

})
export class SignComponent implements OnInit {
  @Output()
  isLogin = new EventEmitter<Boolean>();
  
  ngOnInit() {

  }
  onLogin(arg: boolean){
   this.isLogin.emit(arg);
  }
}

