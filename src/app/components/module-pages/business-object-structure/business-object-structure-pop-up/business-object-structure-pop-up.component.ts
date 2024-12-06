import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessTermService } from 'src/app/services/business-term.service';
import { BusinessService } from 'src/app/services/business.service';
import { swalSuccess } from 'src/app/utils/alert';
import { TermPopUpComponent } from '../../business-term/term-pop-up/term-pop-up.component';
import { FilterPopUpComponent } from '../../filter-pop-up/filter-pop-up.component';
import { BusinessStructureService } from 'src/app/services/business-structure.service';
import { formatDate } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-business-object-structure-pop-up',
  templateUrl: './business-object-structure-pop-up.component.html',
  styleUrls: ['./business-object-structure-pop-up.component.scss']
})
export class BusinessObjectStructurePopUpComponent {
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<TermPopUpComponent>,
    private businessService: BusinessService,
    private businessTermService: BusinessTermService,
    private businessStructureService: BusinessStructureService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // data.popUpType == 'update' || data.popUpType == 'delete' ?
    //   (this.displayedColumn.columns.push('#'),
    //     this.displayedColumn.columnsTranslates.push('#'))
    //   : null
  }

  dataSource = new MatTableDataSource<any>([]);

  pageSizeOptions = [10, 15, 20];
  length = 100;
  pageSize = 10;

  highlightRowDataBusinessObjectDefinition: any;
  activeBusinessObjectDefinition: any = -1;

  displayedColumn: any = {
    columns: [
      "business_object_name",
      "business_attribute_id",
      "business_attribute_name",
      "business_attribute_definition",
      "information_sensitivity_classification",
      "information_sensitivity_type",
      "information_protection_method",
      "business_data_type",
      "business_attribute_length",
      "business_attribute_scale",
      "is_business_key",
      "is_business_date",
      "is_mandatory",
      "is_active",
      "created_updated_by",
      "created_updated_date",
      "remarks"
    ],
    columnsTranslates:
      [
        "BO name",
        "Business attribute id",
        "Business attribute name",
        "Business attribute definition",
        "Information sensitivity classification",
        "Information sensitivitytype",
        "Information protection method",
        "Business data type",
        "Business attribute length",
        "Business attribute scale",
        "Is business key",
        "Is business date",
        "Is mandatory",
        "Is active",
        "Created updated by",
        "Created updated date",
        "Remarks"
      ]
  };

  onChangePage(event: any) {
    this.pageSize = event.pageSize;
  }

  selectedRow: any;
  activeRow: any;
  isActive = (index: number) => { return this.activeRow === index };

  highlight(index: number, id: string, row: any) {
    if (!this.isActive(index)) {
      this.selectedRow = row;
      this.activeRow = index;
      this.onCloseDialog(row)
    }
    else {
      this.activeRow = '';
      this.selectedRow = '';
    }
  }

  onCloseDialog(data: any) {
    let model = {
      data: data,
      type: this.data.popUpType
    }
    this.dialogRef.close(model);
  }

  tableData: any
  handleUpdate(data: any) {
    
  }

  handleDelete(row: any) {
    // this.businessStructureService.deleteBo_structure(bo_id, b_attr_id).subscribe(
    //   {
    //     next: res => swalSuccess("Row deleted from business object structure"),
    //     error: err => console.log(err),
    //   }
    // );
    this.onCloseDialog(row);
  }

  search: any;
  @ViewChild('commonPagDtOwner') commonPaginator!: MatPaginator;
  applyFilter() {
    // this.businessTermService.getBo_term().subscribe({
    //   next: res => {
    //     this.dataSource = new MatTableDataSource<any>(res.data);
    //     this.dataSource.paginator = this.commonPaginator;
    //   },
    //   error: err => console.error('Error fetching business terms', err),
    //   complete: () => {
    //     this.dataSource.filter = this.search;
    //   }
    // });

    this.businessStructureService.getBo_structure().subscribe({
      next: res => {
        this.dataSource = new MatTableDataSource<any>(res.data);
        this.tableData = res.data;
        this.dataSource.paginator = this.commonPaginator;
      },
      error: err => console.error('Error fetching business terms', err),
      complete: () => {
        this.dataSource.filter = this.search;
      }
    });

  }

}
