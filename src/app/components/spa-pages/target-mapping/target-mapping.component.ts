import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CRUDService } from 'src/app/services/crud.service';
import { swalSuccess } from 'src/app/utils/alert';

@Component({
  selector: 'app-target-mapping',
  templateUrl: './target-mapping.component.html',
  styleUrls: ['./target-mapping.component.scss']
})
export class TargetMappingComponent {
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
      Target_Data_Topic_Name: "",
      Target_Data_Topic_Attribute_Name: "",
      Target_Data_Topic_Attribute_Definition: "",
      Source_System: "",
      Source_Data_Topic_Name: "",
      Source_Data_Topic_Attribute_Name: "",
      Source_Data_Topic_Attribute_Definition: "",
      Country_Code: "",
      Source_To_Target_Mapping_BusinessRule: "",
      Data_Processing_Type: "",
      Created_By: "",
      Created_Date: "",
      Approver_Remarks: "",
      Updated_By: "",
      Updated_Date: ""
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
    this.crudService.savetarget_mapping(this.formGroup.value).subscribe({
      next: res => {
        // console.log(res)
        swalSuccess("Saved successfully!");
        this.formGroup.reset({
          Target_Data_Topic_Name: "",
          Target_Data_Topic_Attribute_Name: "",
          Target_Data_Topic_Attribute_Definition: "",
          Source_System: "",
          Source_Data_Topic_Name: "",
          Source_Data_Topic_Attribute_Name: "",
          Source_Data_Topic_Attribute_Definition: "",
          Country_Code: "",
          Source_To_Target_Mapping_BusinessRule: "",
          Data_Processing_Type: "",
          Created_By: "",
          Created_Date: "",
          Approver_Remarks: "",
          Updated_By: "",
          Updated_Date: ""
        })
      },
      error: err => console.log(err)
    })
  }
}
