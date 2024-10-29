import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CRUDService } from 'src/app/services/crud.service';
import { swalSuccess } from 'src/app/utils/alert';

@Component({
  selector: 'app-metadata-attributes',
  templateUrl: './metadata-attributes.component.html',
  styleUrls: ['./metadata-attributes.component.scss']
})
export class MetadataAttributesComponent {
  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private crudService: CRUDService,
  ) { }

  displayedColumns: any = {
    columns: [],
    columnsTranslates: []
  };

  menuTitle = '';

  formGroup!: FormGroup;

  generateForm() {
    this.formGroup = this.fb.group({
      Metadata_Attribute_Classification: "",
          Exception_cases: "",
          Data_Topic_Attribute_Definition: "",
          Domain_values_allowed: "",
          Product: "",
          Sub_Domain: "",
          Down_Stream_Process_Owner: "",
          Data_Domain_Owner: "",
          Data_Asset_Type: "",
          Data_Capture_Mode: "",
          Source_System: "",
          Source_System_Country_Code: "",
          Information_Protection_Method: "",
          Information_Sensitivity_Classification: "",
          Information_Sensitivity_Reason_Code: "",
          Status: "",
          Data_Types: "",
          Is_Business_Key: 0,
          Is_Business_Date: "",
          Is_Mandatory: "",
          Processing_Rule_Type: "",
          Active: "",
          Track_History: "",
          Format: "",
    })
  }

  ngOnInit(): void {
    this.menuTitle = String(localStorage.getItem('menuName'));
    this.generateForm();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  handleSave() {
    this.crudService.savetmetadata_attributes(this.formGroup.value).subscribe({
      next: res => {
        // console.log(res)
        swalSuccess("Saved successfully!");
        this.formGroup.reset({
          Metadata_Attribute_Classification: "",
          Exception_cases: "",
          Data_Topic_Attribute_Definition: "",
          Domain_values_allowed: "",
          Product: "",
          Sub_Domain: "",
          Down_Stream_Process_Owner: "",
          Data_Domain_Owner: "",
          Data_Asset_Type: "",
          Data_Capture_Mode: "",
          Source_System: "",
          Source_System_Country_Code: "",
          Information_Protection_Method: "",
          Information_Sensitivity_Classification: "",
          Information_Sensitivity_Reason_Code: "",
          Status: "",
          Data_Types: "",
          Is_Business_Key: 0,
          Is_Business_Date: "",
          Is_Mandatory: "",
          Processing_Rule_Type: "",
          Active: "",
          Track_History: "",
          Format: "",
        })
      },
      error: err => console.log(err)
    })
  }
} 
