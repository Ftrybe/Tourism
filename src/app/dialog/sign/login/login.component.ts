import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticationService:AuthenticationService) {}


  ngOnInit() {
    
  }

  onSubmit(){
    this.authenticationService.login("admin", "admin")
      .subscribe(result => {
        if (result) {
          
        } else {
          // login failed

        }
      });
  }
}
