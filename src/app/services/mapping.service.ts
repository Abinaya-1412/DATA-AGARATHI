import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MappingService {
  constructor(private http: HttpClient, private router: Router,) {
  }

  api = "https://imd-backend-code.vercel.app/api/business_mappings"
  save(data: any) {
    return this.http.post<any>(this.api, data);
  }

  getAll() {
    return this.http.get<any>(this.api);
  }

  delete(data: string) {
    const body = {
      subject_business_term: data,
    };
    return this.http.request<any>('delete', this.api, {body});
  }

  update(id: string, data: any) {
    let model = {
      data: data,
      conditions: {
        subject_business_term: id
      }
    }

    return this.http.put<any>(this.api, model);
  }

}
