import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Header } from '@angular/http';

//const apiUrl = 'http://ersaptaaristo.xyz/product';
const apiUrl = 'http://localhost/api/product';
@Injectable({
  providedIn: 'root'
})
export class SmisService {
  
  constructor(private http: HttpClient) { }
  getData(url) {
    return this.http.get(`${apiUrl}/${url}`);
  }

  postData(url,credentials){
    return this.http.post(`${apiUrl}/${url}`, JSON.stringify(credentials), {});
  }
}
