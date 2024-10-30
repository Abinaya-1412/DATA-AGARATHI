import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessTermService {
  constructor(private http: HttpClient, private router: Router,) { }
  api = "https://umdproject-iqsre0gjn-umds-projects-76f3b139.vercel.app/api"
 
  saveBo_term(data: any, file: any) {
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('business_term_id', data.business_term_id);
    formData.append('business_term', data.business_term);
    formData.append('business_term_description', data.business_term_description);
    formData.append('version', data.version);
    formData.append('date_created', data.date_created);
    formData.append('active', data.active);
    formData.append('file', file);
    return this.http.post<any>(this.api + `/business_term`, data);
  }
  
  deleteBo_term(business_term_id: number) {
    return this.http.delete<any>(`${this.api}/business_term/${business_term_id}`);
  }
  

  updateBo_term(data: any) {
    return this.http.put<any>(this.api + `/business_term`, data);
  }
 
  getBo_term() {
    return this.http.get<any>(this.api + `/business_term`);
  }

}
