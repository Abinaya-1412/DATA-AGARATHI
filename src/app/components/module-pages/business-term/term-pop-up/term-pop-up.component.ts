import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BusinessService } from 'src/app/services/business.service';
import { ViewGridComponent } from '../../business-obj-definition/view-grid/view-grid.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessTermService } from 'src/app/services/business-term.service';
import { swalSuccess } from 'src/app/utils/alert';

@Component({
  selector: 'app-term-pop-up',
  templateUrl: './term-pop-up.component.html',
  styleUrls: ['./term-pop-up.component.scss']
})
export class TermPopUpComponent {
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<TermPopUpComponent>,
    private businessService: BusinessService,
    private businessTermService: BusinessTermService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    data.popUpType == 'update' || data.popUpType == 'delete' ?
      (this.displayedColumn.columns.push('#'),
        this.displayedColumn.columnsTranslates.push('#'))
      : null

  }  

  dataSource = new MatTableDataSource<any>([]);

  pageSizeOptions = [10, 15, 20];
  length = 100;
  pageSize = 10;

  highlightRowDataBusinessObjectDefinition: any;
  activeBusinessObjectDefinition: any = -1;

  displayedColumn = {
    columnsTranslates: ['Business Term ID', 'Business Term', 'Description', 'Version', 'Date Created', 'Active', 'ID'],
    columns: ['business_term_id', 'business_term', 'business_term_description', 'version', 'date_created', 'active', 'id']
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

  getDataSource() {

  }

  search: any;
  applyFilter() {
    this.businessTermService.getBo_term().subscribe({
      next: res => {
        this.dataSource = new MatTableDataSource<any>(res.data)
      },
      error: err => console.error('Error fetching business terms', err),
      complete: () => {
        this.dataSource.filter = this.search;
      }
    });

  }

  handleUpdate(data: any) {
    this.onCloseDialog(data)
  }

  handleDelete(id: string) {
    this.businessTermService.deleteBo_term(Number(id)).subscribe(
     {
      next: res => swalSuccess("Row deleted from business term"),
      error: err => console.log(err)
     }
    );
  }

}
