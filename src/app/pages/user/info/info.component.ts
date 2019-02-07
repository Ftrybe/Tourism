import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  color = 'blue';
  checked: boolean = false;
  isEdit: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }

  switch() {
   this.isEdit = !this.isEdit;
  }
}
