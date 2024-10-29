import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CRUDService } from 'src/app/services/crud.service';
import { swalSuccess } from 'src/app/utils/alert';

@Component({
  selector: 'app-restriction-rule-mgmt',
  templateUrl: './restriction-rule-mgmt.component.html',
  styleUrls: ['./restriction-rule-mgmt.component.scss']
})
export class RestrictionRuleMgmtComponent {
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
      Country_Code: 0,
      Country_Name: "",
      Restriction_Type: "",
      Restriction_Data_Category: "",
      Restriction_Data_Sub_Category: "",
      Rule: "",
      Rule_Control_Type: ""
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
    this.crudService.saveds_restriction_rule_mgmt(this.formGroup.value).subscribe({
      next: res => {
        // console.log(res)
        swalSuccess("Saved successfully!");
        this.formGroup.reset({
          Country_Code: 0,
          Country_Name: "",
          Restriction_Type: "",
          Restriction_Data_Category: "",
          Restriction_Data_Sub_Category: "",
          Rule: "",
          Rule_Control_Type: ""
        })
      },
      error: err => console.log(err)
    })
  }
}
