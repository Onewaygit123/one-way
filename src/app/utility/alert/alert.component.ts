import { ComponentPortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, EventEmitter, Inject, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface IDynamicDialogConfig {
  title?: string;
  acceptButtonTitle?: string;
  declineButtonTitle?: string;
  dialogContent: TemplateRef<any>;
  class?: string;
}
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit, AfterViewInit {
  class: any;
  portal: ComponentPortal<any>;
  constructor(public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    data.acceptButtonTitle ?? 'Yes';
    data.title ?? 'Unnamed Dialog';
    this.class = data.class
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.portal = new ComponentPortal(this.data.component);

  }
  close() {
    this.dialogRef.close({ data: 'close' })
  }

}
