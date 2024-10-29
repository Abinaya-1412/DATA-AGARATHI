import { formatDate } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { BusinessService } from 'src/app/services/business.service';
import { ComboboxService } from 'src/app/services/combobox.service';
import { swalSuccess, swalError } from 'src/app/utils/alert';
import { filterAutocomplete } from 'src/app/utils/autocomplete';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-bo-name',
  templateUrl: './new-bo-name.component.html',
  styleUrls: ['./new-bo-name.component.scss']
})
export class NewBONameComponent {
  filteredOptionsbusiness_Term?: Observable<any[]>;
  businessTerms: any[] = [];
  
  constructor(
    private businessService: BusinessService,
    private comboboxService: ComboboxService,
    private dialogRef: MatDialogRef<NewBONameComponent>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.generateForm();
    this.getTableBusinessTerm();

    this.businessService.getBusiness_term().subscribe({
      next: res => {
        res.data.map((dt: any) => {
          !this.businessTerms.some(item => item.value === dt.business_term) ? this.businessTerms.push({ value: dt.business_term }) : '';
        });

        let business_id = String(Number(res.data[res.data.length - 1]?.business_term_id.substring(9)) + 1);

        let last_business_id = (business_id.length == 1 ? data.bo_id + 'BR000' : (business_id.length == 2 ?  data.bo_id + 'BR00' : (business_id.length == 3 ?  data.bo_id + 'BR0' : ''))) + business_id;
        let BOD_last_value = res.data.length ? last_business_id :  data.bo_id + 'BR' + "0001";
        console.log()
        this.BTF['business_term_id'].setValue(BOD_last_value)
      },
      error: err => console.log(err)
    })

    this.filteredOptionsbusiness_Term = this.BTF['business_term'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.businessTerms) : this.businessTerms))
    );
   }

  BusinessTermFormGroup!: FormGroup;
  UpdateDataAlternateTerm: any;
  highlightRowDataAltBusiness: any;
  activeRowAltBusiness: any = -1;

  dataSourceAltBusiness: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumnsAltBusiness: any = {
    columns: [ 'business_term', 'business_term_description', '#'],
    columnsTranslates: [ 'Business Term', 'Business Term description', '#']
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
    this.BusinessTermFormGroup = this.fb.group({
      id: 0,
      version: 0,
      date_created: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      active: 0,
      business_term_id: [this.UpdateDataAlternateTerm ? this.UpdateDataAlternateTerm.business_term_id : '', [Validators.required]],
      business_term: [this.UpdateDataAlternateTerm ? this.UpdateDataAlternateTerm.business_term : '', [Validators.required]],
      business_term_description: [this.UpdateDataAlternateTerm ? this.UpdateDataAlternateTerm.business_term_description : '', [Validators.required]],
      // business_object_id: [this.UpdateDataAlternateTerm ? this.UpdateDataAlternateTerm.business_object_id : ''],
      // business_termcol: [this.UpdateDataAlternateTerm ? this.UpdateDataAlternateTerm.business_termcol : ''],
    })
  }

  get BTF(): { [key: string]: AbstractControl } {
    return this.BusinessTermFormGroup.controls;
  }

  ngOnInit() {
    
  }

  getTableBusinessTerm() {
    this.businessService.getBusiness_term().subscribe({
      next: res => {
        this.dataSourceAltBusiness = new MatTableDataSource<any>(res.data);
        this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness;
      },
      error: err => console.log(err)
    })
  }

  isALtTermFormValid = true;
  handleAddAltTerm() {
    if (this.BusinessTermFormGroup.valid) {
      this.isALtTermFormValid = true;
      this.highlightRowDataAltBusiness ? (
        this.businessService.updateBusiness_term(this.highlightRowDataAltBusiness.id, this.BusinessTermFormGroup.value).subscribe({
          next: res => {
            swalSuccess('Updated successfully!');
            this.getTableBusinessTerm();
          },
          error: err => console.log(err)
        }),
        this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness
      ) : (
        // this.dataSourceAltBusiness.data.push(this.BusinessTermFormGroup.value),
        this.saveAltTerm(),
        this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness
      )
      // this.highlightRowDataAltBusiness ? (
      //   this.dataSourceAltBusiness.data[this.activeRowAltBusiness] = this.BusinessTermFormGroup.value,
      //   this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness
      // ) : (
      //   this.dataSourceAltBusiness.data.push(this.BusinessTermFormGroup.value),
      //   this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness
      // )

      this.UpdateDataAlternateTerm = '';
      this.generateForm();
      this.activeRowAltBusiness = -1;
      this.highlightRowDataAltBusiness = '';
    }
    else this.isALtTermFormValid = false;
  }

  saveAltTerm() {
    this.businessService.saveBusiness_term(this.BusinessTermFormGroup.value).subscribe({
      next: res => {
        swalSuccess("Saved successfully.");
        this.getTableBusinessTerm();
        this.onCloseDialog();
      },
      error: err => swalError("Something went wrong")
    });
  }

  isActiveTerm = (tableIndex: number, index: number) => { return this.activeRowAltBusiness === index };

  highlightTerm(tableIndex: number, index: number, id: number, row: any): void {
    if (!this.isActiveTerm(2, index)) {
      row != this.highlightRowDataAltBusiness ? this.highlightRowDataAltBusiness = row : this.highlightRowDataAltBusiness = '';
      this.activeRowAltBusiness = index;
      this.UpdateDataAlternateTerm = row;
      this.generateForm();
    }
    else {
      this.UpdateDataAlternateTerm = '';
      this.generateForm();
      this.activeRowAltBusiness = -1;
      this.highlightRowDataAltBusiness = '';
    }
  }

  handleDeleteAltTerm(id: number) {
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
        this.businessService.deleteBusiness_term(id).subscribe({
          next: res => {
            swalSuccess('Deleted successfully!');
            this.getTableBusinessTerm();
            this.UpdateDataAlternateTerm = '';
            this.generateForm();
            this.activeRowAltBusiness = -1;
            this.highlightRowDataAltBusiness = '';
          },
          error: err => console.log(err)
        });
      }
    })
  }

  onChangePageAltBusiness(event: PageEvent) {
  }


  onCloseDialog() {
    this.dialogRef.close();
  }
}
