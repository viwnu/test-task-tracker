import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelloResponse } from '@app/contracts';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
  getHello() {
    return this.http.get<HelloResponse>('/api/hello');
  }
}
