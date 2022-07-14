import { Injectable } from '@angular/core';
import {VehicleList} from "./vehicle-list";
//import this to make http requests
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
//we've defined our base url here in the env
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private httpClient: HttpClient) { }

  getStudentsInformation(): Observable<VehicleList[]>{
    return this.httpClient.get<VehicleList[]>(`${environment.baseURL}student.json`);
  }
}
