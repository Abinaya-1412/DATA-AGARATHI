import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessStructureService {
  constructor(private http: HttpClient, private router: Router,) { }
  // api = "https://umdproject-iqsre0gjn-umds-projects-76f3b139.vercel.app/api";
api ="https://imd-backend-code.vercel.app/api/bo_structure";
  saveBo_structure(data: any) {
    return this.http.post<any>(this.api, data);
  }

  deleteBo_structure(id: any, b_attr_id:any) {
    const body = {
      business_object_id: id,
      business_attribute_id: b_attr_id,
    };

    return this.http.request<any>('delete', this.api, { body });

  }

  updateBo_structure(data: any) {
    return this.http.put<any>(this.api, data);
  }

  getBo_structure() {
    return this.http.get<any>(this.api);
  }
}
