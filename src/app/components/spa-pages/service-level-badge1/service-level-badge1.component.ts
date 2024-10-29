import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-service-level-badge1',
  templateUrl: './service-level-badge1.component.html',
  styleUrls: ['./service-level-badge1.component.scss']
})
export class ServiceLevelBadge1Component {
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
    this.services.getservice_level_badge1().subscribe({
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
