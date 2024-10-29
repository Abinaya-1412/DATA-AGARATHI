import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CRUDService } from 'src/app/services/crud.service';
import { swalSuccess } from 'src/app/utils/alert';

@Component({
  selector: 'app-data-topic',
  templateUrl: './data-topic.component.html',
  styleUrls: ['./data-topic.component.scss']
})
export class DataTopicComponent {
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
      Operational_Data_Topic_ID: 0,
      Operational_Data_Topic_Name: "",
      Operational_Data_Topic_Description: "",
      Artefact_Identifier: "",
      Artefact_Type: "",
      Business_Unit: "",
      Business_Owner: "",
      Artefact_Country: "",
      Source_System: "",
      Source_Owner: "",
      Related_Artifact_Number: "",
      Artefact_Relationship_Type: "",
      Operational_Data_Topic_Category: "",
      Status: "",
      Creation_Date: "",
      Created_By: "",
      Updated_Date: "",
      Updated_By: ""
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
    this.crudService.saveDataTopic(this.formGroup.value).subscribe({
      next: res => {
        // console.log(res)
        swalSuccess("Saved successfully!");
        this.formGroup.reset({
          Data_Topic_Name: "",
          Operational_Data_Topic_ID: 0,
          Operational_Data_Topic_Name: "",
          Operational_Data_Topic_Description: "",
          Artefact_Identifier: "",
          Artefact_Type: "",
          Business_Unit: "",
          Business_Owner: "",
          Artefact_Country: "",
          Source_System: "",
          Source_Owner: "",
          Related_Artifact_Number: "",
          Artefact_Relationship_Type: "",
          Operational_Data_Topic_Category: "",
          Status: "",
          Creation_Date: "",
          Created_By: "",
          Updated_Date: "",
          Updated_By: ""
        })
      },
      error: err => console.log(err)
    })
  }
}
