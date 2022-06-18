import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { delay, Observable, of } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  travelForm:FormGroup;
  
  constructor() { }

  ngOnInit(): void {
    this.travelForm = new FormGroup({
      pickupLocation: new FormControl('', [Validators.required]),
      dropLocation: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', Validators.required)
    });
  }

  
  get f(){
    return this.travelForm.controls;
  }
  
  submit(){
    console.log(this.travelForm.value);
  }

 

}

