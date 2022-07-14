
import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent, IDynamicDialogConfig } from '../utility/alert/alert.component';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';

import { AngularFireAuth } from '@angular/fire/compat/auth';
// import * as firebase from 'firebase/compat';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Router } from '@angular/router';

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
export class HomeComponent implements OnInit, AfterViewInit, OnChanges {
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

  phoneSignIn = false;
  windowRef: any
  reCaptchaVerifier: any;
  verify: any;
  phoneNum: any = '';
  showErr = false;
  constructor(public dialog: MatDialog, private afAuth: AngularFireAuth, public router: Router) { }
  ngOnChanges() {
  }

  ngOnInit(): void {
    this.travelForm = new FormGroup({
      pickupLocation: new FormControl('',),// [Validators.required]
      dropLocation: new FormControl('',),// [Validators.required]
      phoneNumber: new FormControl('',)// [Validators.required]
    });
    firebase.initializeApp(config)
  
  }

  ngAfterViewInit() {
  }

  get f() {
    return this.travelForm.controls;
  }

  submit() {
    console.log(this.travelForm.value);
    if (this.travelForm.value.phoneNumber) {
      this.phoneNum = '+91' + this.travelForm.value.phoneNumber;
      this.getOtp(this.phoneNum);
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
        if (result == 'close'){
          this.phoneNum ='';
          return;
        } 
        // delete it
      });
    }
  }

  resendOtp(){
    this.getOtp(this.phoneNum);
  }
  onOtpChange(otp: any) {
    this.otp = otp;
  }

  changeBtnNumber() {
    this.dialog.closeAll()
  }

  getOtp(phoneNumber: any) {
    console.log(phoneNumber)
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible'
    })
    firebase.auth().signInWithPhoneNumber(phoneNumber, this.reCaptchaVerifier).then((confirmationResult) => {
      console.log('confirmation result=======', confirmationResult)
      localStorage.setItem('verificationId', JSON.stringify(confirmationResult.verificationId))   
      this.verify = confirmationResult.verificationId;
    }).catch((error) => {
      console.log('error=======', error)
      this.reCaptchaVerifier.clear()
    })
    
  }

  handleClick() {
    let credentials = firebase.auth.PhoneAuthProvider.credential(this.verify, this.otp);
    console.log("firebase --> " + firebase)
    firebase.auth().signInWithCredential(credentials).then((response) => {
      console.log('success case=====', response)
      console.log('success case=====', response.operationType)

      localStorage.setItem('user_data', JSON.stringify(response))
      if (response.operationType == "signIn") {
        this.showErr = false;
        this.dialog.closeAll()
        this.router.navigate(['/vehicleList']);
      }
    }).catch((err) => {
      //show the error to enter correct otp or resend otp
      console.log(err)
      this.showErr = true;
    })
  }


  logout() {
    return this.afAuth.signOut().then((data) => {
      console.log('data============', data)
    })
  }

}

