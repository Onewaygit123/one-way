import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { TrackOrderComponent } from '../track-order/track-order.component';
import { AlertComponent } from '../utility/alert/alert.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openTrackOrder(){
    let dialogRef = this.dialog.open(AlertComponent, {
      width: '27vw',
      data: {
        component: TrackOrderComponent,
        title: 'Track Order',
        hr:true
      }
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result == 'close'){

    //     return;
    //   } 
    //   // delete it
    // });
  }

}
