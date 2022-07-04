import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  contactForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('',),// [Validators.required]
      email: new FormControl('',),// [Validators.required]
      pass: new FormControl('',),// [Validators.required]
      confirmPass: new FormControl('',)
    });
  }

  submit(data: any) {
    console.log(data)
  }

}
