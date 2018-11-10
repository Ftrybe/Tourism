import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatTabsModule} from '@angular/material';


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,MatDialogModule,MatTabsModule],
  exports: [MatButtonModule, MatCheckboxModule,MatDialogModule,MatTabsModule],
})
export class CustomMaterialModule { }