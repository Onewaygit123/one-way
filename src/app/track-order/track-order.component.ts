import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from '../utility/alert/alert.component';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {
  trackForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<AlertComponent>) { }

  ngOnInit() {
    this.trackForm = new FormGroup({
      order: new FormControl('',),// [Validators.required]
      number: new FormControl('',),// [Validators.required]
    });
  }
  submit(){
    console.log('this.trackForm=====',this.trackForm.value)
    this.dialogRef.close(true);
  }

}
