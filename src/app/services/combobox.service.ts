import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComboboxService {

  constructor(private http: HttpClient, private router: Router,) { }
  api = "https://umdproject-2wpwcyy2y-umds-projects-76f3b139.vercel.app/api"
  // saveBo_owner(data: any) {
  //   return this.http.post<any>(this.api + `/asset_type`, data);
  // }

  // getBo_owner() {
  //   return this.http.get<any>(this.api + `/asset_type`);
  // }

  getAsset_type() { 
    return this.http.get<any>(this.api + `/asset_type`);
  }

  saveAsset_type(data:any) { 
    return this.http.post<any>(this.api + `/asset_type`, data);
  }

  updateAsset_type(id:number, data: any){
    return this.http.post<any>(this.api + `/asset_type`, data);
  }
  deleteAsset_type(asset_type_code: string) {  // Use string for asset_type_code
    return this.http.delete<any>(`${this.api}/asset_type/${asset_type_code}`);  // Pass asset_type_code in URL
  }
  
  
  getSensitivity_classification() {
    return this.http.get<any>(this.api + `/sensitivity_classification`);
  }

  saveSensitivity_classification(data:any) { 
    return this.http.post<any>(this.api + `/sensitivity_classification`, data);
  }

  updateSensitivity_classification(id:number, data: any){
    return this.http.post<any>(this.api + `/sensitivity_classification`, data);
  }

  getSensitivity_reason_code() {
    return this.http.get<any>(this.api + `/sensitivity_reason_code`);
  }

  saveSensitivity_reason_code(data:any) { 
    return this.http.post<any>(this.api + `/sensitivity_reason_code`, data);
  }

  updateSensitivity_reason_code(id:number, data: any){
    return this.http.post<any>(this.api + `/sensitivity_reason_code`, data);
  }
 
  getData_owner_roles() {
    return this.http.get<any>(this.api + `/data_owner_roles`);
  }
  
  getSource_systems() {
    return this.http.get<any>(`https://umdproject-jts6kjq65-umds-projects-76f3b139.vercel.app/api/source_systems`);
  }

  getCountry_codes() {
    return this.http.get<any>(`https://umdproject-jts6kjq65-umds-projects-76f3b139.vercel.app/api/country_codes`);
  }

  getOperators(){
    return this.http.get<any>(`https://business-mappings-fpicy16b0-umds-projects-76f3b139.vercel.app/api/operators`);
  }
  // Ref Code Schemes Methods
  getRefCodes() {
    return this.http.get<any>(`https://refcodes-1mvaooi8y-umds-projects-76f3b139.vercel.app/api/refcodes`);
  }

  saveRefCode(data: { ref_code: string; ref_code_description: string }) {
    return this.http.post<any>(`https://refcodes-1mvaooi8y-umds-projects-76f3b139.vercel.app/api/refcodes`, data);
  }

  updateRefCode(ref_code: string, data: { ref_code_description: string }) {
    return this.http.put<any>(`https://refcodes-1mvaooi8y-umds-projects-76f3b139.vercel.app/api/refcodes/${ref_code}`, data);
  }

  deleteRefCode(ref_code: string) {
    return this.http.delete<any>(`https://refcodes-1mvaooi8y-umds-projects-76f3b139.vercel.app/api/refcodes/${ref_code}`);
  }
}
