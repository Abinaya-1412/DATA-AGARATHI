import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessService } from 'src/app/services/business.service';
import { BusinessTermService } from 'src/app/services/business-term.service';
import { swalSuccess } from 'src/app/utils/alert';
import Swal from 'sweetalert2';
import { FilterPopUpComponent } from '../../filter-pop-up/filter-pop-up.component'; // Import the FilterPopUpComponent

@Component({
  selector: 'app-view-grid',
  templateUrl: './view-grid.component.html',
  styleUrls: ['./view-grid.component.scss']
})
export class ViewGridComponent {

  // Flag to track changes in data
  hasChanges = false;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ViewGridComponent>,
    private businessService: BusinessService,
    private businessTermService: BusinessTermService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    data === 'update' || data === 'delete' ? 
      (this.displayedColumnBusinessObjectDefinition.columns.push('#'),
       this.displayedColumnBusinessObjectDefinition.columnsTranslates.push('#')) 
      : null;
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
      "BO Sensitivity Classification",
      "BO Sensitivity Reason",
    ]
  };

  dataSourceBusinessObjectDefinition: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild('commonPagBusinessObjectDefinition') commonPagBusinessObjectDefinition!: MatPaginator;
  pageEvent!: PageEvent;
  lengthDtOwner?: number;
  pageSizeOptions: number[] = [10, 15, 20];
  pageSize = 10; // Added pageSize property
  search: string = ''; // Added for search functionality
  highlightRowDataBusinessObjectDefinition: any;
  activeBusinessObjectDefinition: any = -1;

  ngOnInit() {
    this.applyFilter();  // Call applyFilter on initialization to fetch and display data
  }

  isActiveBusinessObjectDefinition = (index: number) => this.activeBusinessObjectDefinition === index;

  highlightBusinessObjectDefinition(index: number, id: number, row: any): void {
    if (!this.isActiveBusinessObjectDefinition(index)) {
      this.highlightRowDataBusinessObjectDefinition = row;
      this.activeBusinessObjectDefinition = index;
      this.onDataChange(); // Mark that changes were made
    } else {
      this.activeBusinessObjectDefinition = -1;
      this.highlightRowDataBusinessObjectDefinition = '';
      this.resetChanges(); // Reset changes when no row is selected
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
            swalSuccess("Deleted successfully.");
            this.applyFilter();  // Refresh the data after deletion
          },
          error: err => console.log(err)
        });
      }
    });
  }

  handleUpdate(data: any) {
    if (this.hasChanges) {
      this.onCloseDialog(data);
    } else {
      Swal.fire('No changes detected', 'Please make a change before updating.', 'info');
    }
  }

  onCloseDialog(data: any = null) {
    this.dialogRef.close(data);
  }

  applyFilter() {
    this.businessService.getBusinessObjectDefinition().subscribe({
      next: res => {
        this.dataSourceBusinessObjectDefinition = new MatTableDataSource<any>(res.data);
        this.dataSourceBusinessObjectDefinition.paginator = this.commonPagBusinessObjectDefinition;
        this.dataSourceBusinessObjectDefinition.filter = this.search.trim().toLowerCase();
      },
      error: err => console.error('Error fetching business terms', err)
    });
  }

  // Method to open the FilterPopUpComponent in a dialog
  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterPopUpComponent, {
      width: '400px',  // You can adjust the dialog width
      data: {} // You can pass any necessary data to the FilterPopUpComponent
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle filter results and update the table data if necessary
        this.applyFilter();  // Adjust the filtering logic here
      }
    });
  }

  // Method to track changes (assuming you're tracking edits in a form or table)
  onDataChange() {
    this.hasChanges = true; // Mark that changes were made
  }

  // Reset the changes if needed (like canceling edits)
  resetChanges() {
    this.hasChanges = false;
  }

  // Pagination change handler
  onChangePage(event: PageEvent) {
    this.pageSize = event.pageSize;
  }
}
