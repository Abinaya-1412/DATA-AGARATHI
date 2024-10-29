import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessService } from 'src/app/services/business.service';
import { swalSuccess } from 'src/app/utils/alert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-grid',
  templateUrl: './view-grid.component.html',
  styleUrls: ['./view-grid.component.scss']
})
export class ViewGridComponent {

  constructor(
    private dialogRef: MatDialogRef<ViewGridComponent>,
    private businessService: BusinessService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  displayedColumnBusinessObjectDefinition: any = {
    columns: [
      "business_object_id",
      "business_object_name",
      "business_object_description",
      "business_object_asset_type",
      "business_object_sensitivity_classification",
      "business_object_sensitivity_reason",
      '#',
    ],
    columnsTranslates: [
      "BO ID",
      "BO name",
      "BO description",
      "BO Asset Type",
      "BO Sensitivity Calssification",
      "BO Sensitivity Reason",
      '#']
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
        this.dataSourceBusinessObjectDefinition.paginator = this.commonPagBusinessObjectDefinition;
      },
      error: err => console.log(err)
    })
  }

  onCloseDialog(index: number) {
    index ? this.dialogRef.close(this.highlightRowDataBusinessObjectDefinition) : this.dialogRef.close();
  }

  update() {
    this.onCloseDialog(1);
  }

}
