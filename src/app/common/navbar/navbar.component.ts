import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private username:String;

  private islogin:boolean;

  constructor() { }

  ngOnInit() {
    this.username = "范";
    this.islogin = false;
  }

}
