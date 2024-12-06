import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface AssetType {
  assetTypeCode: string;
  assetTypeDescription: string;
}

export interface SensitivityClassification {
  sensitivityClassification: string;
  sensitivityClassificationDescription: string;
}

export interface SensitivityReasonCode {
  sensitivityReasonCode: string;
  sensitivityReasonCodeDescription: string;
}

export interface DataOwnerRoles {
  dataOwnerRoles: string;
  dataOwnerRoleDescription: string;
}
// Define backend response interfaces
interface AssetTypeBackend {
  asset_type_code: string;
  asset_type_description: string;
}

interface SensitivityClassificationBackend {
  sensitivity_classification: string;
  sensitivity_classification_description: string;
}

interface SensitivityReasonCodeBackend {
  sensitivity_reason_code: string;
  sensitivity_reason_description: string;
}

interface DataOwnerRolesBackend {
  data_owner_roles: string;
  data_owner_role_description: string;
}
// Define a generic response interface
interface ApiResponse<T> {
  data?: T[];
  asset_types?: T[];
  sensitivity_classifications?: T[];
  sensitivity_reason_codes?: T[];
  data_owner_roles?: T[];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigureDataService {
 

  private baseUrl = 'https://imd-backend-code.vercel.app/api';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }


    // Asset Type
 // Asset Type
 getAssetTypes(): Observable<AssetType[]> {
  const url = `${this.baseUrl}/asset_type`;
  return this.http.get<ApiResponse<AssetTypeBackend>>(url, this.httpOptions).pipe(
    map((response: ApiResponse<AssetTypeBackend>) => {
      const data = response.data || response.asset_types || [];
      if (!Array.isArray(data)) {
        throw new Error('Unexpected response format');
      }
      return data.map((item: AssetTypeBackend) => ({
        assetTypeCode: item.asset_type_code,
        assetTypeDescription: item.asset_type_description
      }));
    }),
    catchError(this.handleError)
  );
}

saveAssetType(assetType: AssetType): Observable<AssetType> {
  const url = `${this.baseUrl}/asset_type`;
  const payload = {
    asset_type_code: assetType.assetTypeCode,
    asset_type_description: assetType.assetTypeDescription
  };
  return this.http.post<AssetTypeBackend>(url, payload, this.httpOptions).pipe(
    map((response: AssetTypeBackend) => ({
      assetTypeCode: response.asset_type_code,
      assetTypeDescription: response.asset_type_description
    })),
    catchError(this.handleError)
  );
}
deleteAssetType(assetTypeCode: string): Observable<void> {
  const url = `${this.baseUrl}/asset_type`;
  const body = {
    asset_type_code: assetTypeCode
  };
  return this.http.delete<void>(url, {
    ...this.httpOptions,
    body 
  }).pipe(
    catchError(this.handleError)
  );
}
updateAssetType(assetType: AssetType, oldAssetTypeCode: string): Observable<AssetType> {
  const url = `${this.baseUrl}/asset_type`; 
  // Create the payload with data and conditions
  const payload = {
    data: {
      asset_type_code: assetType.assetTypeCode,
      asset_type_description: assetType.assetTypeDescription
    },
    conditions: {
      asset_type_code: oldAssetTypeCode 
    }
  };

  return this.http.put<AssetTypeBackend>(url, payload, this.httpOptions).pipe(
    map((response: AssetTypeBackend) => ({
      assetTypeCode: response.asset_type_code,
      assetTypeDescription: response.asset_type_description
    })),
    catchError(this.handleError)
  );
}

// Sensitivity Classification
getSensitivityClassifications(): Observable<SensitivityClassification[]> {
  const url = `${this.baseUrl}/sensitivity_classification`;
  return this.http.get<ApiResponse<SensitivityClassificationBackend>>(url, this.httpOptions).pipe(
    map((response: ApiResponse<SensitivityClassificationBackend>) => {
      const data = response.data || response.sensitivity_classifications || [];
      if (!Array.isArray(data)) {
        throw new Error('Unexpected response format');
      }
      return data.map((item: SensitivityClassificationBackend) => ({
        sensitivityClassification: item.sensitivity_classification,
        sensitivityClassificationDescription: item.sensitivity_classification_description
      }));
    }),
    catchError(this.handleError)
  );
}

saveSensitivityClassification(sensitivityClassification: SensitivityClassification): Observable<SensitivityClassification> {
  const url = `${this.baseUrl}/sensitivity_classification`;
  const payload = {
    sensitivity_classification: sensitivityClassification.sensitivityClassification,
    sensitivity_classification_description: sensitivityClassification.sensitivityClassificationDescription
  };
  return this.http.post<SensitivityClassificationBackend>(url, payload, this.httpOptions).pipe(
    map((response: SensitivityClassificationBackend) => ({
      sensitivityClassification: response.sensitivity_classification,
      sensitivityClassificationDescription: response.sensitivity_classification_description
    })),
    catchError(this.handleError)
  );
}

// Update Sensitivity Classification
updateSensitivityClassification(sensitivityClassification: SensitivityClassification,oldSensitivityClassification:string): Observable<SensitivityClassification> {
  const url = `${this.baseUrl}/sensitivity_classification`;
  const payload = {
    data: {
      sensitivity_classification: sensitivityClassification.sensitivityClassification,
      sensitivity_classification_description: sensitivityClassification.sensitivityClassificationDescription
    }, 
    conditions:{
      sensitivity_classification: oldSensitivityClassification
    }
    };
  return this.http.put<SensitivityClassificationBackend>(url, payload, this.httpOptions).pipe(
    map((response: SensitivityClassificationBackend) => ({
      sensitivityClassification: response.sensitivity_classification,
      sensitivityClassificationDescription: response.sensitivity_classification_description
    })),
    catchError(this.handleError)
  );
}

// Delete Sensitivity Classification
deleteSensitivityClassification(sensitivityClassification: string): Observable<void> {
  const url = `${this.baseUrl}/sensitivity_classification`;
  const body = {
    sensitivity_classification : sensitivityClassification
  };
  return this.http.delete<void>(url, {
        ...this.httpOptions,
        body
  }).pipe(catchError(this.handleError));
}

// Sensitivity Reason Code
getSensitivityReasonCodes(): Observable<SensitivityReasonCode[]> {
  const url = `${this.baseUrl}/sensitivity_reason_code`;
  return this.http.get<ApiResponse<SensitivityReasonCodeBackend>>(url, this.httpOptions).pipe(
    map((response: ApiResponse<SensitivityReasonCodeBackend>) => {
      const data = response.data || response.sensitivity_reason_codes || [];
      if (!Array.isArray(data)) {
        throw new Error('Unexpected response format');
      }
      return data.map((item: SensitivityReasonCodeBackend) => ({
        sensitivityReasonCode: item.sensitivity_reason_code,
        sensitivityReasonCodeDescription: item.sensitivity_reason_description
      }));
    }),
    catchError(this.handleError)
  );
}

saveSensitivityReasonCode(sensitivityReasonCode: SensitivityReasonCode): Observable<SensitivityReasonCode> {
  const url = `${this.baseUrl}/sensitivity_reason_code`;
  const payload = {
    sensitivity_reason_code: sensitivityReasonCode.sensitivityReasonCode,
    sensitivity_reason_description: sensitivityReasonCode.sensitivityReasonCodeDescription
  };
  return this.http.post<SensitivityReasonCodeBackend>(url, payload, this.httpOptions).pipe(
    map((response: SensitivityReasonCodeBackend) => ({
      sensitivityReasonCode: response.sensitivity_reason_code,
      sensitivityReasonCodeDescription: response.sensitivity_reason_description
    })),
    catchError(this.handleError)
  );
}

// Update Sensitivity Reason Code
updateSensitivityReasonCode(reasonCode: SensitivityReasonCode, oldReasonCode: string): Observable<SensitivityReasonCode> {
  const url = `${this.baseUrl}/sensitivity_reason_code`;
  const payload = {
    data: {
      sensitivity_reason_code: reasonCode.sensitivityReasonCode,
      sensitivity_reason_description: reasonCode.sensitivityReasonCodeDescription
    },
    conditions: {
      sensitivity_reason_code: oldReasonCode
    }
  };
  return this.http.put<SensitivityReasonCodeBackend>(url, payload, this.httpOptions).pipe(
    map((response: SensitivityReasonCodeBackend) => ({
      sensitivityReasonCode: response.sensitivity_reason_code,
      sensitivityReasonCodeDescription: response.sensitivity_reason_description
    })),
    catchError(this.handleError)
  );
}

// Delete Sensitivity Reason Code
deleteSensitivityReasonCode(reasonCode: string): Observable<void> {
  const url = `${this.baseUrl}/sensitivity_reason_code`;
  const body = {
    sensitivity_reason_code: reasonCode
  };
  return this.http.delete<void>(url, {
    ...this.httpOptions,
    body
  }).pipe(
    catchError(this.handleError)
  );
}

// Data Owner Roles
getDataOwnerRoles(): Observable<DataOwnerRoles[]> {
  const url = `${this.baseUrl}/data_owner_roles`;
  return this.http.get<ApiResponse<DataOwnerRolesBackend>>(url, this.httpOptions).pipe(
    map((response: ApiResponse<DataOwnerRolesBackend>) => {
      const data = response.data || response.data_owner_roles || [];
      if (!Array.isArray(data)) {
        throw new Error('Unexpected response format');
      }
      return data.map((item: DataOwnerRolesBackend) => ({
        dataOwnerRoles: item.data_owner_roles,
        dataOwnerRoleDescription: item.data_owner_role_description
      }));
    }),
    catchError(this.handleError)
  );
}

saveDataOwnerRoles(roles: DataOwnerRoles): Observable<DataOwnerRoles> {
  const url = `${this.baseUrl}/data_owner_roles`;
  const payload = {
    data_owner_roles: roles.dataOwnerRoles,
    data_owner_role_description: roles.dataOwnerRoleDescription
  };
  return this.http.post<DataOwnerRolesBackend>(url, payload, this.httpOptions).pipe(
    map((response: DataOwnerRolesBackend) => ({
      dataOwnerRoles: response.data_owner_roles,
      dataOwnerRoleDescription: response.data_owner_role_description
    })),
    catchError(this.handleError)
  );
}

// Update Data Owner Roles
updateDataOwnerRoles(roles: DataOwnerRoles, oldRoleCode: string): Observable<DataOwnerRoles> {
  const url = `${this.baseUrl}/data_owner_roles`;
  const payload = {
    data: {
      data_owner_roles: roles.dataOwnerRoles,
      data_owner_role_description: roles.dataOwnerRoleDescription
    },
    conditions: {
      data_owner_roles: oldRoleCode
    }
  };
  return this.http.put<DataOwnerRolesBackend>(url, payload, this.httpOptions).pipe(
    map((response: DataOwnerRolesBackend) => ({
      dataOwnerRoles: response.data_owner_roles,
      dataOwnerRoleDescription: response.data_owner_role_description
    })),
    catchError(this.handleError)
  );
}

// Delete Data Owner Roles
deleteDataOwnerRoles(roleCode: string): Observable<void> {
  const url = `${this.baseUrl}/data_owner_roles`;
  const body = {
    data_owner_roles: roleCode
  };
  return this.http.delete<void>(url, {
    ...this.httpOptions,
    body
  }).pipe(
    catchError(this.handleError)
  );
}



  // Error Handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
