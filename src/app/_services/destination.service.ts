import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(environment.apiUrl + '/destination/list');
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/destination/show/${id}`);
  }

  insert(destination) {
    return this.http.post(environment.apiUrl + '/destination/insert', destination);
  }

  update(destination) {
    return this.http.put(environment.apiUrl + `/destination/update/${destination.id}`, destination);
  }

  remove(id) {
    return this.http.delete(environment.apiUrl + `/destination/remove/${id}`);
  }

}
