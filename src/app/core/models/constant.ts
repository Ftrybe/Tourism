import {HttpHeaders} from '@angular/common/http';

export class Constant {

  public static httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
}
