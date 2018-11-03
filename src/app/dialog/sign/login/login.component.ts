import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticationService:AuthenticationService) {}


  ngOnInit() {
    
  }

  onLogin(){
    this.authenticationService.login("admin", "admin")
      .subscribe(result => {
        if (result) {
          
        } else {
          // login failed

        }
      });
  }
}
