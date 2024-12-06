import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComboboxService {

  constructor(private http: HttpClient, private router: Router) { }
  api = "https://imd-backend-code.vercel.app/api";
  
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

  updateAsset_type(id:number, data: any) {
    return this.http.post<any>(this.api + `/asset_type`, data);
  }

  deleteAsset_type(asset_type_code: string) {  
    return this.http.delete<any>(`${this.api}/asset_type/${asset_type_code}`);  
  }

  getSensitivity_classification() {
    return this.http.get<any>(this.api + `/sensitivity_classification`);
  }

  saveSensitivity_classification(data:any) {
    return this.http.post<any>(this.api + `/sensitivity_classification`, data);
  }

  updateSensitivity_classification(id:number, data: any) {
    return this.http.post<any>(this.api + `/sensitivity_classification`, data);
  }

  getSensitivity_reason_code() {
    return this.http.get<any>(this.api + `/sensitivity_reason_code`);
  }

  saveSensitivity_reason_code(data:any) {
    return this.http.post<any>(this.api + `/sensitivity_reason_code`, data);
  }

  updateSensitivity_reason_code(id:number, data: any) {
    return this.http.post<any>(this.api + `/sensitivity_reason_code`, data);
  }

  getData_owner_roles() {
    return this.http.get<any>(this.api + `/data_owner_roles`);
  }

  getSource_systems() {
    return this.http.get<any>(`https://imd-backend-code.vercel.app/api/source_systems`);
  }

  getCountry_codes() {
    return this.http.get<any>(`https://imd-backend-code.vercel.app/api/country_codes`);
  }

  getOperators() {
    return this.http.get<any>(`https://imd-backend-code.vercel.app/api/operators`);
  }

  // Ref Code Schemes Methods
  getRefCodes() {
    return this.http.get<any>(`https://imd-backend-code.vercel.app/api/ref_codes`);
  }

  saveRefCode(data: { ref_code: string; ref_code_description: string }) {
    return this.http.post<any>(`https://imd-backend-code.vercel.app/api/ref_codes`, data);
  }

  updateRefCode(ref_code: string, data: { ref_code_description: string }) {
    return this.http.put<any>(`https://imd-backend-code.vercel.app/api/ref_codes/${ref_code}`, data);
  }

  deleteRefCode(ref_code: string) {
    return this.http.delete<any>(`https://imd-backend-code.vercel.app/api/ref_codes/${ref_code}`);
  }

  // BO Implementation Methods
  getBoImplementations() { 
    return this.http.get<any>(`${this.api}/bo_implementation`); 
  }

  saveBoImplementation(data: any) { 
    return this.http.post<any>(`${this.api}/bo_implementation`, data); 
  }

  updateBoImplementation(id: number, data: any) { 
    return this.http.put<any>(`${this.api}/bo_implementation/${id}`, data); 
  }

  deleteBoImplementation(id: number) { 
    return this.http.delete<any>(`${this.api}/bo_implementation/${id}`); 
  }
}
