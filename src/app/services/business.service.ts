import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  constructor(private http: HttpClient, private router: Router,) { }
  api = "https://imd-backend-code.vercel.app/api"
  saveBusinessObjectDefinition(data: any) {
    return this.http.post<any>(`https://imd-backend-code.vercel.app/api/business_object`, data);
  }

  deleteBusinessObjectDefinition(id: number) {
    return this.http.delete<any>(`https://imd-backend-code.vercel.app/api/business_object/` + id);
  }

  updateBusinessObjectDefinition(data: any) {
    return this.http.put<any>(`https://imd-backend-code.vercel.app/api/business_object`, data);
  }

  getBusinessObjectDefinition() {
    return this.http.get<any>(`https://imd-backend-code.vercel.app/api/business_object`);
  }

  saveBo_owner(data: any) {
    return this.http.post<any>(`https://imd-backend-code.vercel.app/api/bo_owner`, data);
   
   
  }

  deleteBo_owner(id: number) {
    return this.http.delete<any>(`https://imd-backend-code.vercel.app/api/bo_owner/` + id);
  }

  updateBo_owner(id: number, data: any) {
    return this.http.put<any>(`https://imd-backend-code.vercel.app/api/bo_owner/` + id, data);
  }

  getBo_owner() {
    return this.http.get<any>(`https://imd-backend-code.vercel.app/api/bo_owner`);
  }

  saveImpDetails(data: any) {
    return this.http.post<any>(`https://imd-backend-code.vercel.app/api/bo_implementation`, data);
  }

  getImpDetails() {
    return this.http.get<any>(`https://imd-backend-code.vercel.app/api/bo_implementation`);
  }

  deleteImpDetails(id: number) {
    const body = {
      business_object_id: id,
    };

    return this.http.request<any>('delete', `https://imd-backend-code.vercel.app/api/bo_implementation`, { body });
    // return this.http.delete<any>(`https://imd-backend-code.vercel.app/api/bo_implementation` + id);
  }

  updateImpDetails(id: number, data: any) {
    let model = {
      data: data,
      conditions: {
        business_object_id: id
      }
    }
    return this.http.put<any>(`https://imd-backend-code.vercel.app/api/bo_implementation`, model);
  }

  saveBusiness_term(data: any) { 
    return this.http.post<any>(this.api + `/business_term`, data);
  }

  getBusiness_term() {
    return this.http.get<any>(this.api + `/business_term`);
  }

  updateBusiness_term(id: number, data: any) { 
    let model = {
      data: data,
      conditions: {
          business_term_id: id
      }
  }

    return this.http.put<any>(`https://imd-backend-code.vercel.app/api/business_term/`, model);
  }

  deleteBusiness_term(id: number) {
    // return this.http.delete<any>(this.api + `/business_term/` + id);

    const body = {
      business_term_id: id,
    };

    return this.http.request<any>('delete', `https://imd-backend-code.vercel.app/api/business_term`, { body });
  }

  saveBusinessRule(data: any) {
    return this.http.post<any>( `https://imd-backend-code.vercel.app/api/bo_rules`, data);
  }

  getBusinessRule() {
    return this.http.get<any>(`https://imd-backend-code.vercel.app/api/bo_rules`);
  }

  updateBusinessRule(id: number, data: any) {
    let model = {
      data: data,
      conditions: {
        business_object_id: id
      }
    }

    return this.http.put<any>(`https://imd-backend-code.vercel.app/api/bo_rules`, model);
  }

  deleteBusinessRule(id: number) {
    const body = {
      business_object_id: id,
    };

    return this.http.request<any>('delete', `https://imd-backend-code.vercel.app/api/bo_rules`, { body });
    // return this.http.delete<any>(this.api + `/bo_rules/` + id);
  }

  getBo_ownerRelatedTable(BO_id: number) {
    return this.http.get<any>(`https://imd-backend-code.vercel.app/api/bo_owner?businessObjectId=${BO_id}`);
  }

  getImplementationsRelatedTable(BO_id: number) {
    return this.http.get<any>(`https://imd-backend-code.vercel.app/api/bo_implementation?businessObjectId=${BO_id}`);
  }

  getTermRelatedTable(BO_id: number) { 
    return this.http.get<any>(`https://imd-backend-code.vercel.app/api/business_term?businessObjectId=${BO_id}`);
  }

  getBo_rulesTable(BO_id: number) {
    return this.http.get<any>(`https://imd-backend-code.vercel.app/api/bo_rules?businessObjectId=${BO_id}`);
  }


}
