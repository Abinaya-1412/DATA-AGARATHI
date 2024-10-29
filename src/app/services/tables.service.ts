import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
}) 

export class TablesService {
  constructor(private http: HttpClient, private router: Router,) { }
 
  getBadgeData() {
    return this.http.get<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/badge`);
  }

  getDas_factsheet_config_tbl() {
    return this.http.get<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/das_factsheet_config_tbl`);
  }

  getData_profile_column() {
    return this.http.get<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/data_profile_column`);
  }

  getdata_profile_datatype() {
    return this.http.get<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/data_profile_datatype`);
  }
  getdata_profile_pattern() {
    return this.http.get<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/data_profile_pattern`);
  }
  getdata_profile_statistics() {
    return this.http.get<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/data_profile_statistics`);
  }
  getdata_profile_values() {
    return this.http.get<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/data_profile_values`);
  }
  getfactsheet_detail() {
    return this.http.get<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/factsheet_detail`);
  }
  getfactsheet_master() {
    return this.http.get<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/factsheet_master`);
  }
  getrc_rl_template() {
    return this.http.get<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/rc_rl_template`);
  }
  getservice_level_badge() {
    return this.http.get<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/service_level_badge`);
  }
  getservice_level_badge1() {
    return this.http.get<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/service_level_badge1`);
  }
  getservice_level_metric() {
    return this.http.get<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/service_level_metric`);
  }
  getservice_level_metric_master() {
    return this.http.get<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/service_level_metric_master`);
  }
  getservice_level_metrics() {
    return this.http.get<any>(`https://umdproject-ojt2n3i2l-umds-projects-76f3b139.vercel.app/api/service_level_metrics`);
  }
}
