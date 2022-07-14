import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { AlertComponent } from '../utility/alert/alert.component';
import { VehicleList } from './vehicle-list';
import { VehicleService } from './vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})

export class VehicleListComponent implements OnInit {
  VehicleList: VehicleList[] = [];
  public displayedColumnHeader = ['Driver Name', 'Vehicle Type', 'Capacity', 'Size', 'Cost', 'Mobile number'];
  //the source where we will get the data
  public dataSource = new MatTableDataSource<VehicleList>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['modification',];
  columns: string[] = [];
  headerText: string;
  pickUpTruck = "../../assets/images/Pickup_location_icon.png";
  dropTruck = "../../assets/images/Drop_location_icon.png";
  constructor(private studentApiService: VehicleService, public dialog: MatDialog,) {
  }

  ngOnInit() {
    this.getStudentsInformation();
    this.getColumns().then((cols: any) => {
      this.displayedColumns.unshift(...cols);
      this.columns = cols;
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getStudentsInformation() {
    this.studentApiService.getStudentsInformation()
      .subscribe((res) => {
        this.dataSource.data = res;
      })
  }

  getColumns() {
    /*assume this is an api*/
    return new Promise((resolve, reject) => {
      resolve(['driverName', 'vehicleType', 'capacity', 'size', 'cost', 'mobileNum']);
    })
  }

  getDriverDetail(data: any) {
    console.log('selected data=========', data)

    if (data) {
      let dialogRef = this.dialog.open(AlertComponent, {
        width: '43vw',
        maxWidth: '100vw',
        data: {
          component: CreateAccountComponent,
          title: 'Create Account',
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
}
