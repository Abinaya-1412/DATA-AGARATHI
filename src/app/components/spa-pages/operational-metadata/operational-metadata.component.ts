import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CRUDService } from 'src/app/services/crud.service';
import { swalSuccess } from 'src/app/utils/alert';

@Component({
  selector: 'app-operational-metadata',
  templateUrl: './operational-metadata.component.html',
  styleUrls: ['./operational-metadata.component.scss']
})
export class OperationalMetadataComponent {
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
      Data_Topic_Name: "",
      Data_Topic_Attribute_Name: "",
      Data_Lifecycle_Status: "",
      Allowable_Values: "",
      Remarks: "",
      Sample_Data: ""
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
    this.crudService.saveoperational_metadata(this.formGroup.value).subscribe({
      next: res => {
        // console.log(res)
        swalSuccess("Saved successfully!");
        this.formGroup.reset({
          Data_Topic_Name: "",
          Data_Topic_Attribute_Name: "",
          Data_Lifecycle_Status: "",
          Allowable_Values: "",
          Remarks: "",
          Sample_Data: ""
        })
      },
      error: err => console.log(err)
    })
  }
}
