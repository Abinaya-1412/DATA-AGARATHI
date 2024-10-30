import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulePagesComponent } from './module-pages.component';
import { RouterModule } from '@angular/router';
import { ViewGridComponent } from './business-obj-definition/view-grid/view-grid.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    ModulePagesComponent,
    ViewGridComponent,
    // NewBONameComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule 
  ]
})
export class ModulePagesModule { }
