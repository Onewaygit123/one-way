import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from '../utility/alert/alert.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  contactForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<AlertComponent>) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('',),// [Validators.required]
      email: new FormControl('',),// [Validators.required]
      pass: new FormControl('',),// [Validators.required]
      confirmPass: new FormControl('',)
    });
  }

  submit() {
    console.log('this.contactForm======',this.contactForm.value)
    this.dialogRef.close(true);
  }

}
