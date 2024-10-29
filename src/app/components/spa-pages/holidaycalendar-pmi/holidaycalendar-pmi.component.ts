import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CRUDService } from 'src/app/services/crud.service';
import { swalSuccess } from 'src/app/utils/alert';

@Component({
  selector: 'app-holidaycalendar-pmi',
  templateUrl: './holidaycalendar-pmi.component.html',
  styleUrls: ['./holidaycalendar-pmi.component.scss']
})
export class HolidaycalendarPmiComponent {
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
      business_date: "",
      cty: "",
      desc: "",
      system_name: ""
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
    this.crudService.saveholidaycalendar_pmi(this.formGroup.value).subscribe({
      next: res => {
        // console.log(res)
        swalSuccess("Saved successfully!");
        this.formGroup.reset({
          business_date: "",
          cty: "",
          desc: "",
          system_name: ""
        })
      },
      error: err => console.log(err)
    })
  }
}
