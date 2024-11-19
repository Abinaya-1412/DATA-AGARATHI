import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ComboboxService } from 'src/app/services/combobox.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent {
  formGroup!: FormGroup;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns = ['refcode', 'description', '#'];
  pageSizeOptions: number[] = [20, 30, 40];

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<NewItemComponent>,
    private fb: FormBuilder,
    private comboboxService: ComboboxService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit() {
    this.initForm();
    this.fetchDataByRefcode();
  }

  // Dynamic title based on inputName
  get dynamicTitle(): string {
    const titlesMap: { [key: string]: string } = {
      'business_object_asset_type': 'Asset Type',
      'business_object_sensitivity_classification': 'Sensitivity Classification',
      'business_object_sensitivity_reason': 'Sensitivity Reason',
      'business_object_name': 'BO Name',
      'scope_of_data_domain': 'Scope of Data Domain',
      'project_name': 'Project Name',
      'created_by': 'Created/Updated By',
      'remarks': 'Remarks',
      'business_unit_owner': 'Business Unit Owner',
      'business_function': 'Business Function',
      'role': 'Role',
      'source_system': 'Source System',
      'source_system_country_code': 'Source Sys. Country Code',
      'req_frequency_of_refresh': 'Req Frequency of Refresh',
      'data_capture_mode': 'Data Capture Mode',
      'sourcing_mode': 'Sourcing Mode',
      'history_type': 'History Type',
      'error_treatment': 'Error Treatment',
      'exception_treatment': 'Exception Treatment',
      'rule': 'Rule',
      'business_term': 'Business Term'
    };
  
    // Check if the inputName exists in the map, and prepend "New" to the value
    return titlesMap[this.data.inputName] 
      ? `New ${titlesMap[this.data.inputName]}` 
      : 'New Item';
  }
  

  initForm() {
    // Initialize form group with correct field names
    this.formGroup = this.fb.group({
      ref_code: [this.data.refcode || '', Validators.required],  // ref_code instead of refcode
      ref_code_description: [this.data.description || '', Validators.required]  // ref_code_description instead of description
    });
  }

  fetchDataByRefcode() {
    this.comboboxService.getRefCodes().subscribe({
      next: (res: any) => {
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => console.error('Error fetching data:', err)
    });
  }

  handleSave() {
    const model = this.formGroup.value;
    if (this.formGroup.invalid) {
      Swal.fire('Error', 'Please fill in all required fields.', 'error');
      return; // Prevent saving if form is invalid
    }

    // Map the model to match API expectations
    const apiModel = {
      ref_code: model.ref_code,  // ref_code for the API
      ref_code_description: model.ref_code_description  // ref_code_description for the API
    };

    // Check if we are updating or saving a new record
    if (!this.data.update) {
      this.comboboxService.saveRefCode(apiModel).subscribe({
        next: (res: any) => {
          Swal.fire('Success', 'Record saved!', 'success');
          this.onCloseDialog();
        },
        error: (err: any) => {
          console.error('Error saving record:', err);
          Swal.fire('Error', 'Failed to save record. Please try again later.', 'error');
        }
      });
    } else {
      this.comboboxService.updateRefCode(this.data.ref_code, apiModel).subscribe({
        next: (res: any) => {
          Swal.fire('Success', 'Record updated!', 'success');
          this.onCloseDialog();
        },
        error: (err: any) => {
          console.error('Error updating record:', err);
          Swal.fire('Error', 'Failed to update record. Please try again later.', 'error');
        }
      });
    }
  }

  onCloseDialog() {
    this.dialogRef.close();
  }
}
