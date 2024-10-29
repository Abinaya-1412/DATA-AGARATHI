import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {
  constructor(private http: HttpClient, private router: Router,) { }

  saveDataTopic(data: any) {
    return this.http.post<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/datatopic`, data);
  }

  saveds_restriction_rule_mgmt(data: any) {
    return this.http.post<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/ds_restriction_rule_mgmt`, data);
  }

  saveholidaycalendar_pmi(data: any) {
    return this.http.post<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/holidaycalendar_pmi`, data);
  }

  saveoperational_metadata(data: any) {
    return this.http.post<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/operational_metadata`, data);
  }

  savetarget_mapping(data: any) {
    return this.http.post<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/target_mapping`, data);
  }

  savetmetadata_attributes(data: any) {
    return this.http.post<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/metadata_attributes`, data);
  }
}
