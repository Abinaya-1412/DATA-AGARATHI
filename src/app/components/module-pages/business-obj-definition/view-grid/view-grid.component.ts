import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessService } from 'src/app/services/business.service';
import { swalSuccess } from 'src/app/utils/alert';
import Swal from 'sweetalert2';
import { FilterPopUpComponent } from '../../filter-pop-up/filter-pop-up.component';

@Component({
  selector: 'app-view-grid',
  templateUrl: './view-grid.component.html',
  styleUrls: ['./view-grid.component.scss']
})
export class ViewGridComponent {

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ViewGridComponent>,
    private businessService: BusinessService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    data == 'update' || data == 'delete' ?
      (this.displayedColumnBusinessObjectDefinition.columns.push('#'),
        this.displayedColumnBusinessObjectDefinition.columnsTranslates.push('#'))
      : null

  }

  displayedColumnBusinessObjectDefinition: any = {
    columns: [
      "business_object_id",
      "business_object_name",
      "business_object_description",
      "business_object_asset_type",
      "business_object_sensitivity_classification",
      "business_object_sensitivity_reason",
    ],
    columnsTranslates: [
      "BO ID",
      "BO name",
      "BO description",
      "BO Asset Type",
      "BO Sensitivity Calssification",
      "BO Sensitivity Reason",
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
    this.getTableBusinessObjectDefinition();
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
        this.businessService.deleteBusinessObjectDefinition(id).subscribe({
          next: res => {
            swalSuccess("Saved successfully.");
            this.getTableBusinessObjectDefinition();
          },
          error: err => console.log(err)
        });
      }
    })
  }

  getTableBusinessObjectDefinition() {
    this.businessService.getBusinessObjectDefinition().subscribe({
      next: res => {
        this.dataSourceBusinessObjectDefinition = new MatTableDataSource<any>(res.data);
        this.tableData = res.data;
        this.dataSourceBusinessObjectDefinition.paginator = this.commonPagBusinessObjectDefinition;
      },
      error: err => console.log(err)
    })
  }

  onCloseDialog(data: any) {
    data ? this.dialogRef.close(data) : this.dialogRef.close();
  }

  // update() {
  //   this.onCloseDialog(1);
  // }

  handleUpdate(data: any) {
    this.onCloseDialog(data)
  }

  tableData: any
  filter_dialogRef!: MatDialogRef<FilterPopUpComponent>;

  handleFilter() {
    this.filter_dialogRef = this.dialog.open(FilterPopUpComponent,
      {
        disableClose: true,
        width: '80%',
        height: 'auto',
        autoFocus: false,
        data: [
          { name: 'Project name', value: 'project_name' },
          { name: 'BO name', value: 'business_object_name' },
          { name: 'BO description', value: 'business_object_description' },
          { name: 'Scope of data domain', value: 'scope_of_data_domain' },
          { name: 'BO asset type', value: 'business_object_asset_type' },
          { name: 'BO sensitivity classification', value: 'business_object_sensitivity_classification' },
          { name: 'BO sensitivity reason', value: 'business_object_sensitivity_reason' },
          { name: 'Created/Updated by', value: 'created_by' },
          { name: 'Created/Updated date', value: 'date_created' },
          { name: 'Remarks', value: 'remarks' },

          { name: 'Business unit owner', value: 'business_unit_owner' },
          { name: 'Business function', value: 'business_function' },
          { name: 'Role', value: 'role' },

          { name: 'Source System', value: 'source_system' },
          { name: 'Source Sys. Country Code', value: 'source_system_country_code' },
          { name: 'Req Frequency of Refresh', value: 'req_frequency_of_refresh' },
          { name: 'Active', value: 'active' },
          { name: 'Data Capture Mode', value: 'data_capture_mode' },
          { name: 'Data Capture Mode', value: 'sourcing_mode' },
          { name: 'Track History', value: 'track_history' },
          { name: 'History Type', value: 'history_type' },
          { name: 'Error Treatment', value: 'error_treatment' },
          { name: 'Exception Treatment', value: 'exception_treatment' },

          { name: 'Rule', value: 'rule' },

          { name: 'Business term', value: 'business_term' },
          { name: 'Business term description', value: 'business_term_description' },
          { name: 'Version', value: 'version' },
        ]
      });

    this.filter_dialogRef.afterClosed().subscribe({
      next: res => {
        this.activeBusinessObjectDefinition = -1;
        this.highlightRowDataBusinessObjectDefinition = '';
        if (res) {
          this.dataSourceBusinessObjectDefinition = new MatTableDataSource<any>(this.applyFilters(this.tableData, res));
        }
      }
    })
  }

  filters: any[] = [];
  applyFilters(data: any[], filterData: any) {
    this.filters = this.getFilterValues(filterData, data);
    return data.filter((item) => {
      if (!this.filters || this.filters.length == 0) {
        return
      }
      return this.filters?.every((filter) => {
        if (item.hasOwnProperty(filter.columnName)) {
          return (
            (item as any)[filter.columnName]?.toString().toLowerCase() ===
            filter.value?.toString().toLowerCase()
          );
        }
        return false;
      });
    });
  }

  getFilterValues(filterForm: any, data: any[]) {
    this.filters = [];
    let filterArr: any[] = [];
    Object.keys(filterForm.controls).forEach((key: string) => {
      if (String(filterForm.get(key)?.value).length > 0) {
        filterArr?.push({
          columnName: key,
          value: filterForm.get(key)?.value,
        });
      }
    });

    filterArr.map((dt: any) => {
      data.every((filter) => {
        if (filter.hasOwnProperty(dt.columnName)) {
          this.filters.push(dt);
        }
      });
    })

    return this.filters
  }

}
