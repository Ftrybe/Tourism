import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: ['.fixed-bottom {position: fixed;bottom: 0;width:100%;}']
})
export class FooterComponent implements OnInit {

  constructor() { }
  ngOnInit() {
   }
}
