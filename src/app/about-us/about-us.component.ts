import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
   this.logout();
  }

  logout() {
    return this.afAuth.signOut().then((data) => {
      console.log('data============', data)
    })
  }

}
