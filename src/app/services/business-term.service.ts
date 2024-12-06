import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessTermService {
  constructor(private http: HttpClient, private router: Router,) { }
  api = "https://umdproject-iqsre0gjn-umds-projects-76f3b139.vercel.app/api"

  saveBo_term(data: any) {
    return this.http.post<any>(`https://imd-backend-code.vercel.app/api/business_term`, data);
  }

  uploadTermFile(file: any){
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`https://bussiness-term-greerh8pl-umds-projects-76f3b139.vercel.app/upload`, formData);
  }

  deleteBo_term(business_term_id: number) {
    return this.http.delete<any>(`https://imd-backend-code.vercel.app/api/business_term/${business_term_id}`);
  }

  updateBo_term(data: any) {
    return this.http.put<any>(`https://imd-backend-code.vercel.app/api/business_term`, data);
  }

  getBo_term() {
    return this.http.get<any>(`https://imd-backend-code.vercel.app/api/business_term`);
  }

  getBo_termForId()  {
    return this.http.get<any>(`https://business-term-id-asc.vercel.app/api/business-terms`);
  }

}
