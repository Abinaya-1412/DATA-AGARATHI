import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessTermService } from 'src/app/services/business-term.service';
import { BusinessService } from 'src/app/services/business.service';
import { swalSuccess } from 'src/app/utils/alert';
import { TermPopUpComponent } from '../../business-term/term-pop-up/term-pop-up.component';
import { FilterPopUpComponent } from '../../filter-pop-up/filter-pop-up.component';
import { BusinessStructureService } from 'src/app/services/business-structure.service';
import { formatDate } from '@angular/common';

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

    data.popUpType == 'update' || data.popUpType == 'delete' ?
      (this.displayedColumn.columns.push('#'),
        this.displayedColumn.columnsTranslates.push('#'))
      : null

    this.getTableData();

  }

  getTableData() {
    this.businessStructureService.getBo_structure().subscribe({
      next: res => {
        res.data.map((dt: any) => dt.created_updated_date = formatDate(dt.created_updated_date, 'yyyy-MM-dd', 'en'))
        this.dataSource = new MatTableDataSource<any>(res.data);
        this.tableData = res.data;
      },
      error: err => console.error('Error fetching business terms', err),
    });
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
    }
    else {
      this.activeRow = '';
      this.selectedRow = '';
    }
  }

  onCloseDialog(data: any) {
    this.dialogRef.close(data);
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
          { name: 'BO name', value: 'business_object_name' },
          { name: 'Business attribute id', value: 'business_attribute_id' },
          { name: 'Business attribute name', value: 'business_attribute_name' },
          { name: 'Business attribute definition', value: 'business_attribute_definition' },
          { name: 'Information sensitivity classification', value: 'information_sensitivity_classification' },
          { name: 'Information sensitivity type', value: 'information_sensitivity_type' },
          { name: 'Information protection method', value: 'information_protection_method' },
          { name: 'Business data type', value: 'business_data_type' },
          { name: 'Business attribute length', value: 'business_attribute_length' },
          { name: 'Business attribute scale', value: 'business_attribute_scale' },
          { name: 'Is business key', value: 'is_business_key' },
          { name: 'Is business date', value: 'is_business_date' },
          { name: 'Is mandatory', value: 'is_mandatory' },
          { name: 'Is active', value: 'is_active' },
          { name: 'Created updated by', value: 'created_updated_by' },
          { name: 'Created updated date', value: 'created_updated_date' },
          { name: 'Remarks', value: 'remarks' },
        ]
      });

    this.filter_dialogRef.afterClosed().subscribe({
      next: res => {
        if (res) {
          this.dataSource = new MatTableDataSource<any>(this.applyFilters(this.tableData, res));
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

  handleUpdate(data: any) {
    this.onCloseDialog(data)
  }

  handleDelete(bo_id: any, b_attr_id: any) {
    this.businessStructureService.deleteBo_structure(bo_id, b_attr_id).subscribe(
      {
        next: res => swalSuccess("Row deleted from business object structure"),
        error: err => console.log(err),
        complete: () => {
          this.getTableData();
        },
      }
    );
  }

}
