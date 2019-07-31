import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(environment.apiUrl + '/queue/list');
  }

  listByStatus(status) {
    return this.http.get(environment.apiUrl + `/queue/listbystatus/${status}`);
  }

  insert(data) {
    return this.http.post(environment.apiUrl + '/queue/insert', data);
  }

  registerAttendance(mod) {
    return this.http.put(environment.apiUrl + `/queue/registerattendance/${mod.id}`, mod);
  }

  sendsms(mod) {
    return this.http.put(environment.apiUrl + `/queue/sendsms/${mod.id}`, mod);
  }

}
