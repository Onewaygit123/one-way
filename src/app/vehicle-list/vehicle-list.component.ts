import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleList } from './vehicle-list';
import { VehicleService } from './vehicle.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})

export class VehicleListComponent implements OnInit {
  VehicleList: VehicleList[] = [];
  // columns we will show on the table
  public displayedColumns = ['driverName', 'vehicleType', 'capacity', 'size', 'cost', 'mobileNum'];
  public displayedColumnHeader = ['Driver Name', 'Vehicle Type', 'Capacity', 'Size', 'Cost', 'Mobile number','test'];
  //the source where we will get the data
  public dataSource = new MatTableDataSource<VehicleList>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private studentApiService: VehicleService) { 
  }

  ngOnInit() {
    this.getStudentsInformation();
    this.displayedColumns.push('modification')
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getStudentsInformation() {
    this.studentApiService.getStudentsInformation()
      .subscribe((res) => {
        console.log(res);
        this.dataSource.data = res;
      })
  }

}
