import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BadgeComponent } from './components/spa-pages/badge/badge.component';
import { DasFactsheetConfigComponent } from './components/spa-pages/das-factsheet-config/das-factsheet-config.component';
import { DataProfileComponent } from './components/spa-pages/data-profile/data-profile.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DataTopicComponent } from './components/spa-pages/data-topic/data-topic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataProfileDatatypeComponent } from './components/spa-pages/data-profile-datatype/data-profile-datatype.component';
import { DataProfilePatternComponent } from './components/spa-pages/data-profile-pattern/data-profile-pattern.component';
import { DataProfileStatisticsComponent } from './components/spa-pages/data-profile-statistics/data-profile-statistics.component';
import { DataProfileValuesComponent } from './components/spa-pages/data-profile-values/data-profile-values.component';
import { FactsheetDetailComponent } from './components/spa-pages/factsheet-detail/factsheet-detail.component';
import { FactsheetMasterComponent } from './components/spa-pages/factsheet-master/factsheet-master.component';
import { RcRlTemplateComponent } from './components/spa-pages/rc-rl-template/rc-rl-template.component';
import { ServiceLevelBadgeComponent } from './components/spa-pages/service-level-badge/service-level-badge.component';
import { ServiceLevelBadge1Component } from './components/spa-pages/service-level-badge1/service-level-badge1.component';
import { ServiceLevelMetricComponent } from './components/spa-pages/service-level-metric/service-level-metric.component';
import { ServiceLevelMetricMasterComponent } from './components/spa-pages/service-level-metric-master/service-level-metric-master.component';
import { ServiceLevelMetricsComponent } from './components/spa-pages/service-level-metrics/service-level-metrics.component';
import { RestrictionRuleMgmtComponent } from './components/spa-pages/restriction-rule-mgmt/restriction-rule-mgmt.component';
import { HolidaycalendarPmiComponent } from './components/spa-pages/holidaycalendar-pmi/holidaycalendar-pmi.component';
import { OperationalMetadataComponent } from './components/spa-pages/operational-metadata/operational-metadata.component';
import { TargetMappingComponent } from './components/spa-pages/target-mapping/target-mapping.component';
import { MetadataAttributesComponent } from './components/spa-pages/metadata-attributes/metadata-attributes.component';
import { LandingComponent } from './components/landing/landing.component';
import { NewItemComponent } from './components/module-pages/business-obj-definition/new-item/new-item.component';
import { MatSelectModule } from '@angular/material/select';

import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { BusinessObjDefinitionComponent } from './components/module-pages/business-obj-definition/business-obj-definition.component';
import { ModulePagesModule } from './components/module-pages/module-pages.module';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ViewGridComponent } from './components/module-pages/business-obj-definition/view-grid/view-grid.component';
import { NewBONameComponent } from './components/module-pages/business-obj-definition/new-bo-name/new-bo-name.component';
import { BusinessObjectStructureComponent } from './components/module-pages/business-object-structure/business-object-structure.component';
import { BusinessTermComponent } from './components/module-pages/business-term/business-term.component';


@NgModule({
  declarations: [
    AppComponent,
    BadgeComponent,
    DasFactsheetConfigComponent,
    DataProfileComponent,
    DashboardComponent,
    DataTopicComponent,
    DataProfileDatatypeComponent,
    DataProfilePatternComponent,
    DataProfileStatisticsComponent,
    DataProfileValuesComponent,
    FactsheetDetailComponent,
    FactsheetMasterComponent,
    RcRlTemplateComponent,
    ServiceLevelBadgeComponent,
    ServiceLevelBadge1Component,
    ServiceLevelMetricComponent,
    ServiceLevelMetricMasterComponent,
    ServiceLevelMetricsComponent,
    RestrictionRuleMgmtComponent,
    HolidaycalendarPmiComponent,
    OperationalMetadataComponent,
    TargetMappingComponent,
    MetadataAttributesComponent,
    LandingComponent,
    NewItemComponent,
    BusinessObjDefinitionComponent,
    NewBONameComponent,
    BusinessObjectStructureComponent,
    BusinessTermComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule.withConfig({callSetDisabledState: 'whenDisabledForLegacyCode'}),
    MatMenuModule,
    DragDropModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCardModule,
    MatTreeModule,
    RouterModule,
    MatAutocompleteModule,
    ModulePagesModule,
    NgxSpinnerModule,
    MatTooltipModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
