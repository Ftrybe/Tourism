import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }
  @Output()
  loginState = new EventEmitter();
  
  ngOnInit() {
  }

  onSubmit(form){
    
  }
 
}
