import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private services: TablesService,
    
  ) { }

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  selectionModule = new SelectionModel<any>(true, []);

  displayedColumns:any = {
    columns: [],
    columnsTranslates: []
  };

  pageEvent!: PageEvent;
  length?: number;
  lengthVender?: number;
  pageSize!: number;
  pageSizeOptions: number[] = [20, 30, 40];
  @ViewChild('commonPag') commonPaginator!: MatPaginator;

  menuTitle = '';

  ngOnInit(): void {
    this.menuTitle = String(localStorage.getItem('menuName'));
    this.getTableData();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  getTableData() {
    this.services.getBadgeData().subscribe({
      next: res => {
        this.displayedColumns.columns = res.columns;

        this.displayedColumns.columnsTranslates = res.columns.map((dt: any) => String(dt).replaceAll('_', ' '));

        this.dataSource = new MatTableDataSource<any>(res.data)
      },
      error: err => console.log(err)
    })
  }

  onChangePage(event: PageEvent) {

  }


}
