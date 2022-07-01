import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  constructor(private studentApiService: VehicleService) {
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
}
