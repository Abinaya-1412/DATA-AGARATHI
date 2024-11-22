import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessService } from 'src/app/services/business.service';
import { FilterPopUpComponent } from '../../filter-pop-up/filter-pop-up.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { swalInfo, swalSuccess } from 'src/app/utils/alert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-data-owner',
  templateUrl: './data-owner.component.html',
  styleUrls: ['./data-owner.component.scss']
})
export class DataOwnerComponent {
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DataOwnerComponent>,
    private businessService: BusinessService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    data.type == 'update' || data.type == 'delete' ?
      (this.displayedColumnBusinessObjectDefinition.columns.push('#'),
        this.displayedColumnBusinessObjectDefinition.columnsTranslates.push('#'))
      : null

  }

  displayedColumnBusinessObjectDefinition: any = {
    columns: [
      'business_unit_owner',
      'business_function',
      'role',
    ],
    columnsTranslates: [
      'Business Unit Owner',
      'Business Function',
      'Role'
    ]
  };

  dataSourceBusinessObjectDefinition: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild('commonPagBusinessObjectDefinition') commonPagBusinessObjectDefinition!: MatPaginator;
  pageEvent!: PageEvent;
  lengthDtOwner?: number;
  lengthSrcSystem?: number;
  lengthBussnRule?: number;
  lengthAltBusiness?: number;
  pageSize!: number;
  pageSizeOptions: number[] = [20, 30, 40];

  highlightRowDataBusinessObjectDefinition: any;
  activeBusinessObjectDefinition: any = -1;

  ngOnInit() {
    // this.getTableBusinessObjectDefinition();
  }

  isActiveBusinessObjectDefinition = (index: number) => { return this.activeBusinessObjectDefinition === index };
  highlightBusinessObjectDefinition(index: number, id: number, row: any): void {
    if (!this.isActiveBusinessObjectDefinition(index)) {
      row != this.highlightRowDataBusinessObjectDefinition ? this.highlightRowDataBusinessObjectDefinition = row : this.highlightRowDataBusinessObjectDefinition = '';
      this.activeBusinessObjectDefinition = index;
    }
    else {
      this.activeBusinessObjectDefinition = -1;
      this.highlightRowDataBusinessObjectDefinition = '';
    }
  }

  handleDeleteBusinessObjectDefinition(id: number) {
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
        this.businessService.deleteBo_owner(id).subscribe({
          next: res => {
            swalSuccess('Deleted successfully!');
            this.applyFilter();
          },
          error: err => console.log(err)
        });
      }
    })
  }

  handleUpdate(data: any) {
    this.onCloseDialog(data)
  }

  search: any;
  applyFilter() {
    this.businessService.getBo_ownerRelatedTable(this.data.business_id).subscribe({
      next: res => {
        res.data.length ? (this.dataSourceBusinessObjectDefinition = new MatTableDataSource<any>(res.data),
          this.dataSourceBusinessObjectDefinition.paginator = this.commonPagBusinessObjectDefinition) : swalInfo("Have no data for this business object!"), this.dataSourceBusinessObjectDefinition = new MatTableDataSource<any>([])
      },
      error: err => console.error('Error fetching business terms', err),
      complete: () => {
        this.dataSourceBusinessObjectDefinition.filter = this.search;
      }
    });

  }


  onCloseDialog(data: any) {
    data ? this.dialogRef.close(data) : this.dialogRef.close();
  }
}
