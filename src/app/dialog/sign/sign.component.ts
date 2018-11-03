import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html'
  
})
export class SignComponent implements OnInit {

  private selected;
  constructor() { }

  ngOnInit() {
    this.selected = true;
  }

}
