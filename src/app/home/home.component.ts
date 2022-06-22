
import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent, IDynamicDialogConfig } from '../utility/alert/alert.component';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';

import { AngularFireAuth } from '@angular/fire/compat/auth';
// import * as firebase from 'firebase/compat';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var config = {
  apiKey: "AIzaSyBliX8lyhZfuojatwV48NUaJUcoZjzn8uI",
  authDomain: "phone-auth-d8c7c.firebaseapp.com",
  projectId: "phone-auth-d8c7c",
  storageBucket: "phone-auth-d8c7c.appspot.com",
  messagingSenderId: "182198145214",
  appId: "1:182198145214:web:a7613d6b3f6c134d720eef"
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  travelForm: FormGroup;
  options: string[] = ['Delhi', 'Mumbai', 'Banglore'];
  openOTPDialog: boolean = false;
  @ViewChild('yesNoDialogTemplate') yesNoTemplate: TemplateRef<any> | undefined;
  otp: string;
  
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput: NgOtpInputComponent;
  config: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: { width: "40px", height: "45px", },
  };

  phoneNumber = '+919965053456';
  phoneSignIn = false;
  windowRef: any
  reCaptchaVerifier: any;
  verify: any;
  constructor(public dialog: MatDialog, private afAuth:AngularFireAuth) { }

  ngOnInit(): void {
    this.travelForm = new FormGroup({
      pickupLocation: new FormControl('',),// [Validators.required]
      dropLocation: new FormControl('',),// [Validators.required]
      phoneNumber: new FormControl('',)// [Validators.required]
    });
    firebase.initializeApp(config)
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
  }
  ngAfterViewInit() {

  }

  get f() {
    return this.travelForm.controls;
  }

  submit() {
    console.log(this.travelForm.value);
   // this.getOtp();
    let dialogRef = this.dialog.open(AlertComponent, {
      width: '29vw',
      data: <IDynamicDialogConfig>{
        title: 'Verify your mobile number',
        dialogContent: this.yesNoTemplate,
        acceptButtonTitle: '',
        declineButtonTitle: '',
        class: 'verify-mobile'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('result============', result)
      if (!result) return;
      // delete it
    });
  }

  onOtpChange(otp: any) {
    this.otp = otp;
  }

  changeBtnNumber(){
    
  }

  sendOtp() {
    // this.afAuth.signInWithPhoneNumber('9965053456').then((confirmationResult:any) => {
    // this.windowRef.confirmationResult = confirmationResult;
    // })
  }

  getOtp() {
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible'
    })

    firebase.auth().signInWithPhoneNumber(this.phoneNumber, this.reCaptchaVerifier).then((confirmationResult) => {
      console.log('confirmation result=======', confirmationResult)
      localStorage.setItem('verificationId', JSON.stringify(confirmationResult.verificationId))
    }).catch((error) => {
      console.log('error=======', error.message)
    })
  }

  handleClick(){
    let credentials = firebase.auth.PhoneAuthProvider.credential(this.verify,this.otp);
    firebase.auth().signInWithCredential(credentials).then((response)=>{
      localStorage.setItem('user_data', JSON.stringify(response))
      console.log('response========', response)// siginIn comes it is working perfectly
    }).catch((err)=>{
      console.log(err.message)
    })
  }


  logout(){
    return this.afAuth.signOut().then((data)=>{
      console.log('data============',data)
    })
  }

}

