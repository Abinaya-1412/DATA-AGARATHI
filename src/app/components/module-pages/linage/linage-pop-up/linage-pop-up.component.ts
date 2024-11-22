import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessTermService } from 'src/app/services/business-term.service';
import { BusinessService } from 'src/app/services/business.service';
import { swalSuccess } from 'src/app/utils/alert';
import { TermPopUpComponent } from '../../business-term/term-pop-up/term-pop-up.component';
import { MappingService } from 'src/app/services/mapping.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-linage-pop-up',
  templateUrl: './linage-pop-up.component.html',
  styleUrls: ['./linage-pop-up.component.scss']
})
export class LinagePopUpComponent {
  constructor(
    private dialogRef: MatDialogRef<LinagePopUpComponent>,
    private businessTermService: BusinessTermService,
    private mappingService: MappingService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    data.popUpType == 'update' || data.popUpType == 'delete' ?
      (this.displayedColumn.columns.push('#'),
        this.displayedColumn.columnsTranslates.push('#'))
      : null

    this.getTableData();
  }

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild('commonPagDtOwner') commonPaginator!: MatPaginator;
  
  pageSizeOptions = [10, 15, 20];
  length = 100;
  pageSize = 10;

  highlightRowDataBusinessObjectDefinition: any;
  activeBusinessObjectDefinition: any = -1;

  displayedColumn = {
    columnsTranslates: ['Subject Business Term', 'Relationship', 'Operator', 'Value', 'Object Business Term'],
    columns: ['subject_business_term', 'relationship', 'operator', 'value', 'object_business_term']
  };

  getTableData() {

  }

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

  search: any;
  applyFilter() {
    this.mappingService.getAll().subscribe({
      next: res => {
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.paginator = this.commonPaginator;
      },
      error: err => console.log(err),
      complete: () => {
        this.dataSource.filter = this.search;
      }
    })
  }

  handleUpdate(data: any) {
    this.onCloseDialog(data)
  }

  handleDelete(id: string) {
    this.mappingService.delete(id).subscribe(
      {
        next: res => {
          swalSuccess("Row deleted from business term");
          this.applyFilter();
        },
        error: err => console.log(err)
      }
    );
  }
}
