import { ComponentPortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface IDynamicDialogConfig {
  title?: string;
  acceptButtonTitle?: string;
  declineButtonTitle?: string;
  dialogContent: TemplateRef<any>;
  class?:string;
}
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit,AfterViewInit {
 
  constructor(public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDynamicDialogConfig) {
      data.acceptButtonTitle ?? 'Yes';
      data.title ?? 'Unnamed Dialog';
     }

  ngAfterViewInit() {
   
  }

  ngOnInit() {

  }
  
}
