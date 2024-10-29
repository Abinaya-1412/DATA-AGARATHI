import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessStructureService {
  constructor(private http: HttpClient, private router: Router,) { }
  api = "https://umdproject-iqsre0gjn-umds-projects-76f3b139.vercel.app/api"
 
  saveBo_structure(data: any) {
    return this.http.post<any>(this.api + `/bo_structure`, data); 
  }

  deleteBo_structure(id: number) {
    return this.http.delete<any>(this.api + `/bo_structure/` + id);
  }

  updateBo_structure(data: any) {
    return this.http.put<any>(this.api + `/bo_structure`, data);
  }
 
  getBo_structure() {
    return this.http.get<any>(this.api + `/bo_structure`);
  }
}
