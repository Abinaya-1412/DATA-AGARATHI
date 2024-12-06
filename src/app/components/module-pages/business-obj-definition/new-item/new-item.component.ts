import { Component, Inject, ViewChild, OnInit } from '@angular/core';
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
export class NewItemComponent implements OnInit {
  formGroup!: FormGroup;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns = ['refcode', 'description', '#'];
  pageSizeOptions: number[] = [20, 30, 40];
  dynamicInputName: string = ''; // Variable to hold the dynamic input name
  dropdownOptions: any[] = []; // Array to hold dropdown options

  @ViewChild('paginator') paginator!: MatPaginator;

  // Map input names to their corresponding scheme codes
  schemeCodeMapping: { [key: string]: string } = {
    business_object_asset_type: 'AssetType',
    data_capture_mode: 'DataCaptureModes',
    history_type: 'HistoryTypes',
    business_object_sensitivity_reason: 'Reason',
    req_frequency_of_refresh: 'Refresh',
    business_object_sensitivity_classification: 'Sensitivity',
    sourcing_mode: 'SourcingMode',
    error_treatment: 'TreatmentTypes',
    exception_treatment: 'TreatmentTypes',
  };

  constructor(
    private dialogRef: MatDialogRef<NewItemComponent>,
    private fb: FormBuilder,
    private comboboxService: ComboboxService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit() {
    this.dynamicInputName = this.data.inputName; // Initialize dynamicInputName
    this.initForm();
    this.fetchDataByRefcode();
  }

  // Dynamic title based on inputName
  get dynamicTitle(): string {
    const titlesMap: { [key: string]: string } = {
      business_object_asset_type: 'Asset Type',
      data_capture_mode: 'Data Capture Mode',
      history_type: 'History Type',
      business_object_sensitivity_reason: 'Sensitivity Reason',
      req_frequency_of_refresh: 'Frequency of Refresh',
      business_object_sensitivity_classification: 'Sensitivity Classification',
      sourcing_mode: 'Sourcing Mode',
      error_treatment: 'Error Treatment',
      exception_treatment: 'Exception Treatment',
    };

    return titlesMap[this.dynamicInputName]
      ? `New ${titlesMap[this.dynamicInputName]}`
      : 'New Item';
  }

  initForm() {
    // Dynamically set form control names based on inputName
    this.formGroup = this.fb.group({
      ref_code: ['', Validators.required],
      ref_code_description: ['', Validators.required],
    });
  }

  fetchDataByRefcode() {
    this.comboboxService.getRefCodes().subscribe({
      next: (res: any) => {
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
        this.dropdownOptions = res.data; // Update dropdown options
      },
      error: (err: any) => console.error('Error fetching data:', err),
    });
  }

  handleIconClick() {
    // Save the record dynamically when the icon is clicked
    const { ref_code, ref_code_description } = this.formGroup.value;

    if (!ref_code || !ref_code_description) {
      Swal.fire('Error', 'Please fill in the Ref Code and Description.', 'error');
      return;
    }

    // Fetch the scheme code dynamically based on inputName
    const scheme_code = this.schemeCodeMapping[this.dynamicInputName];

    const dataToSave = {
      ref_code, // Changed from refCode to ref_code
      ref_code_description, // Changed from description to ref_code_description
      scheme_code, // Changed from schemeCode to scheme_code
    };

    // Call the save API
    this.comboboxService.saveRefCode(dataToSave).subscribe({
      next: (res: any) => {
        Swal.fire('Success', 'Record saved successfully!', 'success');
        this.fetchDataByRefcode(); // Refresh the data table and dropdown list
      },
      error: (err: any) => {
        console.error('Error saving record:', err);
        Swal.fire('Error', 'Failed to save the record.', 'error');
      },
    });
  }

  handleSave() {
    const model = this.formGroup.value;

    if (this.formGroup.invalid) {
      Swal.fire('Error', 'Please fill in all required fields.', 'error');
      return;
    }

    // Map the data dynamically
    const scheme_code = this.schemeCodeMapping[this.dynamicInputName];
    const dataToSave = {
      ref_code: model.ref_code, // Changed from refCode to ref_code
      ref_code_description: model.ref_code_description, // Changed from description to ref_code_description
      scheme_code, // Changed from schemeCode to scheme_code
    };

    this.comboboxService.saveRefCode(dataToSave).subscribe({
      next: (res: any) => {
        Swal.fire('Success', 'Record saved successfully!', 'success');
        this.fetchDataByRefcode(); // Refresh the data table and dropdown list
        this.onCloseDialog();
      },
      error: (err: any) => {
        console.error('Error saving record:', err);
        Swal.fire('Error', 'Failed to save the record. Please try again.', 'error');
      },
    });
  }

  onCloseDialog() {
    this.dialogRef.close();
  }
}
