import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulePagesComponent } from './module-pages.component';
import { RouterModule } from '@angular/router';
import { ViewGridComponent } from './business-obj-definition/view-grid/view-grid.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TermPopUpComponent } from './business-term/term-pop-up/term-pop-up.component';
import { FormsModule } from '@angular/forms';
import { LinageComponent } from './linage/linage.component';
import { LinagePopUpComponent } from './linage/linage-pop-up/linage-pop-up.component';
import { BusinessObjectStructurePopUpComponent } from './business-object-structure/business-object-structure-pop-up/business-object-structure-pop-up.component';
import { DataOwnerComponent } from './business-obj-definition/data-owner/data-owner.component';
import { ImpleDataComponent } from './business-obj-definition/imple-data/imple-data.component';
import { BusinessRuleComponent } from './business-obj-definition/business-rule/business-rule.component';
import { BusinessTermComponent } from './business-obj-definition/business-term/business-term.component';

@NgModule({
  declarations: [
    ModulePagesComponent,
    ViewGridComponent,
    TermPopUpComponent,
    BusinessObjectStructurePopUpComponent,
    DataOwnerComponent,
    ImpleDataComponent,
    BusinessRuleComponent,
    BusinessTermComponent,
    // NewBONameComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule ,
    FormsModule 
  ]
})
export class ModulePagesModule { }
