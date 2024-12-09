import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchemasService {
  constructor(private http: HttpClient, private router: Router) { }

  api = "https://imd-backend-refcodeview.vercel.app/api/ref_code_view/filter?scheme_code=";

  getAssetsTypes() {
    return this.http.get<any>(this.api + `AssetType`);
  }

  getReasons() {
    return this.http.get<any>(this.api + `Reason`);
  }

  getSensitivitys() {
    return this.http.get<any>(this.api + `Sensitivity`);
  }
  getRefreshFrequency() {
    return this.http.get<any>(this.api + `Refresh`); 
  }
  getDataCaptureModes() {
    return this.http.get<any>(this.api + `DataCaptureModes`); 
  }
  getHistoryTypes(){
    return this.http.get<any>(this.api + `HistoryTypes`); 
  }
  getSourcingModes(){
    return this.http.get<any>(this.api + `SourcingMode`); 
  }
  getTreatmentTypes(){
    return this.http.get<any>(this.api + `TreatmentTypes`); 
  }
}
