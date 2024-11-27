import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchemasService {
  constructor(private http: HttpClient, private router: Router) { }

  api = "https://refcodeapi-phomr0098-umds-projects-76f3b139.vercel.app/api/ref_code_view/filter?scheme_code=";

  getAssetsTypes() {
    return this.http.get<any>(this.api + `AssetType`);
  }

  getReasons() {
    return this.http.get<any>(this.api + `Reason`);
  }

  getSensitivitys() {
    return this.http.get<any>(this.api + `Sensitivity`);
  }
}
