import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-filter-pop-up',
  templateUrl: './filter-pop-up.component.html',
  styleUrls: ['./filter-pop-up.component.scss']
})
export class FilterPopUpComponent {
  filterModel = [
    { name: 'Project name', value: 'project_name' },
    { name: 'BO name', value: 'business_object_name' },
    { name: 'BO description', value: 'business_object_description' },
    { name: 'Scope of data domain', value: 'scope_of_data_domain' },
    { name: 'BO asset type', value: 'business_object_asset_type' },
    { name: 'BO sensitivity classification', value: 'business_object_sensitivity_classification' },
    { name: 'BO sensitivity reason', value: 'business_object_sensitivity_reason' },
    { name: 'Created/Updated by', value: 'created_by' },
    { name: 'Created/Updated date', value: 'date_created' },
    { name: 'Remarks', value: 'remarks' },

    { name: 'Business unit owner', value: 'business_unit_owner' },
    { name: 'Business function', value: 'business_function' },
    { name: 'Role', value: 'role' },
   
    { name: 'Source System', value: 'source_system' },
    { name: 'Source Sys. Country Code', value: 'source_system_country_code' },
    { name: 'Req Frequency of Refresh', value: 'req_frequency_of_refresh' },
    { name: 'Active', value: 'active' },
    { name: 'Data Capture Mode', value: 'data_capture_mode' },
    { name: 'Data Capture Mode', value: 'sourcing_mode' },
    { name: 'Track History', value: 'track_history' },
    { name: 'History Type', value: 'history_type' },
    { name: 'Error Treatment', value: 'error_treatment' },
    { name: 'Exception Treatment', value: 'exception_treatment' },

    { name: 'Rule', value: 'rule' },

    { name: 'Business term', value: 'business_term' },
    { name: 'Business term description', value: 'business_term_description' },
    { name: 'Version', value: 'version' },
  ]

  formGroup: FormGroup = this.fb.group({});

  constructor(
    private dialogRef: MatDialogRef<FilterPopUpComponent>,
    private businessService: BusinessService,
    private fb: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.filterModel.map((dt: any) => {
      this.formGroup.addControl(dt.value, new FormControl(''));
    })
  }

  search = '';
  ngOnInit() { }

  applyFilter() {
    this.formGroup.value.search = this.search;
    this.dialogRef.close(this.formGroup);
  }

  onCloseDialog() {
    this.dialogRef.close();
  }
}
