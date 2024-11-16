import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MappingService {
  constructor(private http: HttpClient, private router: Router,) { }
  api = "https://business-mappings-db2inydvc-umds-projects-76f3b139.vercel.app/api/business_mappings"

  save(data: any) {
    return this.http.post<any>(this.api, data);
  }

  getAll() {
    return this.http.get<any>(this.api);
  }

  delete(data: string) {
    return this.http.delete<any>(`${this.api}/${data}`);
  }

  update(id: string, data: any) {
    return this.http.put<any>(this.api + `/${id}`, data);
  }

}
