import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-request-dialog',
  templateUrl: './confirm-request-dialog.component.html'
})
export class ConfirmRequestDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmRequestDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public title: string
  ) {
  }
  ngOnInit() {
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
