import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ComboboxService } from 'src/app/services/combobox.service';
import { swalSuccess } from 'src/app/utils/alert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent {
  constructor(
    private dialogRef: MatDialogRef<NewItemComponent>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private comboboxService: ComboboxService,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) { }

  formGroup!: FormGroup;
  UpdateData: any;

  highlightRowDataAltBusiness: any;
  activeRowAltBusiness: any = -1;

  dataSourceAltBusiness: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumnsAltBusiness: any = {
    columns: ['name', 'description', '#'],
    columnsTranslates: ['Code or Name ', 'Description', '#']
  };

  pageEvent!: PageEvent;
  lengthDtOwner?: number;
  lengthSrcSystem?: number;
  lengthBussnRule?: number;
  lengthAltBusiness?: number;
  pageSize!: number;
  pageSizeOptions: number[] = [20, 30, 40];
  @ViewChild('commonPagAltBusiness') commonPaginatorAltBusiness!: MatPaginator;

  generateForm() {
    this.formGroup = this.fb.group({
      name: [this.UpdateData ? this.UpdateData.name : '', [Validators.required]],
      description: [this.UpdateData ? this.UpdateData.description : '', [Validators.required]]
    })
  }

  ngOnInit() {
    this.generateForm();
    console.log(this.data.inputName)

    this.getTableData();
  }

  getTableData() {

    if (this.data.inputName == 'business_object_asset_type') {
      this.comboboxService.getAsset_type().subscribe({
        next: res => {
          res.data.map((dt: any) => {
            this.dataSourceAltBusiness.data.push({ name: dt.asset_type_code, description: dt.asset_type_description })
          })
          this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness;
        },
        error: err => console.log(err)
      });
    }

    else if (this.data.inputName == 'business_object_sensitivity_classification') {
      this.comboboxService.getSensitivity_classification().subscribe({
        next: res => {
          res.data.map((dt: any) => {
            this.dataSourceAltBusiness.data.push({ name: dt.sensitivity_classification, description: dt.sensitivity_classification_description })
          })
          this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness;
        },
        error: err => console.log(err)
      });
    }

    else if (this.data.inputName == 'business_object_sensitivity_reason') {
      this.comboboxService.getSensitivity_reason_code().subscribe({
        next: res => {
          res.data.map((dt: any) => {
            this.dataSourceAltBusiness.data.push({ name: dt.sensitivity_reason_code, description: dt.sensitivity_reason_description })
          });
          this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness;
        },
        error: err => console.log(err)
      });
    }

  }

  isActive = (index: number) => { return this.activeRowAltBusiness === index };

  highlight(tableIndex: number, index: number, id: number, row: any): void {
    if (!this.isActive(index)) {
      row != this.highlightRowDataAltBusiness ? this.highlightRowDataAltBusiness = row : this.highlightRowDataAltBusiness = '';
      this.activeRowAltBusiness = index;
      this.UpdateData = row;
      this.generateForm();
    }
    else {
      this.UpdateData = '';
      this.generateForm();
      this.activeRowAltBusiness = -1;
      this.highlightRowDataAltBusiness = '';
    }
  }

  handleDeleteAlt(id: number) {
    Swal.fire({
      text: 'Do you want to delete data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#266AB8',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // this.businessService.deleteBusiness_(id).subscribe({
        //   next: res => {
        //     swalSuccess('Deleted successfully!');
        //     this.getTableBusiness();
        //     this.UpdateDataAlternate = '';
        //     this.generateForm();
        //     this.activeRowAltBusiness = -1;
        //     this.highlightRowDataAltBusiness = '';
        //   },
        //   error: err => console.log(err)
        // });
      }
    })
  }

  onChangePageAltBusiness(event: PageEvent) {
  }

  handleSave() {
    if (this.data.inputName == 'business_object_asset_type') {
      let model = {
        asset_type_code: this.formGroup.value.name,
        asset_type_description: this.formGroup.value.description
      }

      !this.highlightRowDataAltBusiness ? this.saveAssetType(model) : this.updateAssetType(model)
    }

    else if (this.data.inputName == 'business_object_sensitivity_classification') {
      let model = {
        sensitivity_classification: this.formGroup.value.name,
        sensitivity_classification_description: this.formGroup.value.description
      }

      !this.highlightRowDataAltBusiness ? this.saveSensitivity_classification(model) : this.updateSensitivity_classification(model)
    }

    else if (this.data.inputName == 'business_object_sensitivity_reason') {
      let model = {
        sensitivity_reason_code: this.formGroup.value.name,
        sensitivity_reason_description: this.formGroup.value.description
      }

      !this.highlightRowDataAltBusiness ? this.saveSensitivity_reason_code(model) : this.updateSensitivity_reason_code(model)
    }
  }

  saveAssetType(model: any) {
    this.comboboxService.saveAsset_type(model).subscribe({
      next: res => {
        swalSuccess('Successfully save!');
        this.onCloseDialog();
      },
      error: err => console.log(err)
    })
  }

  updateAssetType(model: any) {
    this.comboboxService.updateAsset_type(this.highlightRowDataAltBusiness.id, model).subscribe({
      next: res => {
        swalSuccess('Successfully update!');
        this.onCloseDialog();
      },
      error: err => console.log(err)
    })
  }

  saveSensitivity_classification(model: any) {
    this.comboboxService.saveSensitivity_classification(model).subscribe({
      next: res => {
        swalSuccess('Successfully save!');
        this.onCloseDialog();
      },
      error: err => console.log(err)
    })
  }

  updateSensitivity_classification(model: any) {
    this.comboboxService.updateSensitivity_classification(this.highlightRowDataAltBusiness.id, model).subscribe({
      next: res => {
        swalSuccess('Successfully update!');
        this.onCloseDialog();
      },
      error: err => console.log(err)
    })
  }

  saveSensitivity_reason_code(model: any) {
    this.comboboxService.saveSensitivity_reason_code(model).subscribe({
      next: res => {
        swalSuccess('Successfully save!');
        this.onCloseDialog();
      },
      error: err => console.log(err)
    })
  }

  updateSensitivity_reason_code(model: any) {
    this.comboboxService.updateSensitivity_reason_code(this.highlightRowDataAltBusiness.id, model).subscribe({
      next: res => {
        swalSuccess('Successfully update!');
        this.onCloseDialog();
      },
      error: err => console.log(err)
    })
  }

  onCloseDialog() {
    this.dialogRef.close();
  }
}
