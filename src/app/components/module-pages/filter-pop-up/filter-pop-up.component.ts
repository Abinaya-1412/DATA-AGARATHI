import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-filter-pop-up',
  templateUrl: './filter-pop-up.component.html',
  styleUrls: ['./filter-pop-up.component.scss']
})
export class FilterPopUpComponent {
  filterModel: any[] = [];
  formGroup: FormGroup = this.fb.group({});

  constructor(
    private dialogRef: MatDialogRef<FilterPopUpComponent>,
    private businessService: BusinessService,
    private fb: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.filterModel = data;

    this.filterModel.map((dt: any) => {
      this.formGroup.addControl(dt.value, new FormControl(''));
    })
  }

  actives: any[] = [
    {
      key: 1,
      value: 'Yes'
    },
    {
      key: 0,
      value: 'No'
    },
  ];

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
