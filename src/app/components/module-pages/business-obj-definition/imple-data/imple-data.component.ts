import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessService } from 'src/app/services/business.service';
import { swalSuccess, swalInfo } from 'src/app/utils/alert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-imple-data',
  templateUrl: './imple-data.component.html',
  styleUrls: ['./imple-data.component.scss']
})
export class ImpleDataComponent {
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ImpleDataComponent>,
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
      'source_system',
      'source_system_country_code',
      'req_frequency_of_refresh',
      'active',
      'data_capture_mode',
      'sourcing_mode',
      'track_history',
      'history_type',
      'error_treatment',
      'exception_treatment',
    ],
    columnsTranslates: [
      'Source System',
      'Source Sys. Country Code',
      'Req Frequency of Refresh',
      'Active',
      'Data Capture Mode',
      'Sourcing Mode',
      'Track History ',
      'History Type',
      'Error Treatment',
      'Exception  Treatment',
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

  isActiveBusinessObjectDefinition = (index: number) => { return this.activeBusinessObjectDefinition === index };
  highlightBusinessObjectDefinition(index: number, id: number, row: any): void {
    if (!this.isActiveBusinessObjectDefinition(index)) {
      row != this.highlightRowDataBusinessObjectDefinition ? this.highlightRowDataBusinessObjectDefinition = row : this.highlightRowDataBusinessObjectDefinition = '';
      this.activeBusinessObjectDefinition = index;
      this.onCloseDialog(row)
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
        this.businessService.deleteImpDetails(id).subscribe({
          next: res => {
            swalSuccess('Deleted successfully!');
            this.applyFilter();
            // this.getTableBusinessObjectDefinition();
          },
          error: err => console.log(err)
        });
      }
    })
  }

  search: any;
  applyFilter() {
    this.businessService.getImplementationsRelatedTable(this.data.business_id).subscribe({
      next: res => {
        res.data.length ? (this.dataSourceBusinessObjectDefinition = new MatTableDataSource<any>(res.data),
          this.dataSourceBusinessObjectDefinition.paginator = this.commonPagBusinessObjectDefinition) : (swalInfo("Have no data for this business object!"), this.dataSourceBusinessObjectDefinition = new MatTableDataSource<any>([]))
      },
      error: err => console.error('Error fetching business terms', err),
      complete: () => {
        this.dataSourceBusinessObjectDefinition.filter = this.search;
      }
    });
  }

  onCloseDialog(data: any) {
    this.dialogRef.close(data ? data : '')
  }
}
