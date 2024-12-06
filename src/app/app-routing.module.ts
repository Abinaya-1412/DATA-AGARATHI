import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RcRlTemplateComponent } from './components/spa-pages/rc-rl-template/rc-rl-template.component';
import { ServiceLevelBadgeComponent } from './components/spa-pages/service-level-badge/service-level-badge.component';
import { ServiceLevelBadge1Component } from './components/spa-pages/service-level-badge1/service-level-badge1.component';
import { ServiceLevelMetricComponent } from './components/spa-pages/service-level-metric/service-level-metric.component';
import { ServiceLevelMetricMasterComponent } from './components/spa-pages/service-level-metric-master/service-level-metric-master.component';
import { ServiceLevelMetricsComponent } from './components/spa-pages/service-level-metrics/service-level-metrics.component';
import { RestrictionRuleMgmtComponent } from './components/spa-pages/restriction-rule-mgmt/restriction-rule-mgmt.component';
import { OperationalMetadataComponent } from './components/spa-pages/operational-metadata/operational-metadata.component';
import { TargetMappingComponent } from './components/spa-pages/target-mapping/target-mapping.component';
import { LandingComponent } from './components/landing/landing.component';
import { BusinessObjDefinitionComponent } from './components/module-pages/business-obj-definition/business-obj-definition.component';
import { ModulePagesComponent } from './components/module-pages/module-pages.component';
import { BadgeComponent } from './components/spa-pages/badge/badge.component';
import { DasFactsheetConfigComponent } from './components/spa-pages/das-factsheet-config/das-factsheet-config.component';
import { DataProfileDatatypeComponent } from './components/spa-pages/data-profile-datatype/data-profile-datatype.component';
import { DataProfilePatternComponent } from './components/spa-pages/data-profile-pattern/data-profile-pattern.component';
import { DataProfileStatisticsComponent } from './components/spa-pages/data-profile-statistics/data-profile-statistics.component';
import { DataProfileValuesComponent } from './components/spa-pages/data-profile-values/data-profile-values.component';
import { DataProfileComponent } from './components/spa-pages/data-profile/data-profile.component';
import { DataTopicComponent } from './components/spa-pages/data-topic/data-topic.component';
import { FactsheetDetailComponent } from './components/spa-pages/factsheet-detail/factsheet-detail.component';
import { FactsheetMasterComponent } from './components/spa-pages/factsheet-master/factsheet-master.component';
import { HolidaycalendarPmiComponent } from './components/spa-pages/holidaycalendar-pmi/holidaycalendar-pmi.component';
import { MetadataAttributesComponent } from './components/spa-pages/metadata-attributes/metadata-attributes.component';
import { BusinessObjectStructureComponent } from './components/module-pages/business-object-structure/business-object-structure.component';
import { AuthGuard } from './guards/auth.guard';
import { BusinessTermComponent } from './components/module-pages/business-term/business-term.component';
import { LinageComponent } from './components/module-pages/linage/linage.component';

const routes: Routes = [ 
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  
  {
    path: 'pages', component: ModulePagesComponent, children: [
      { path: 'business', component: BusinessObjDefinitionComponent },
      { path: 'structure', component: BusinessObjectStructureComponent },
      { path: 'businessTerm', component: BusinessTermComponent },
      { path: 'mapping', component: LinageComponent }
    ],
    // canActivate: [AuthGuard] 
  },
 

  {
    path: 'main', component: DashboardComponent, children: [
      { path: 'badge', component: BadgeComponent },
      { path: 'das-factsheet-config', component: DasFactsheetConfigComponent },
      { path: 'data_profile_column', component: DataProfileComponent },
      { path: 'data_profile_datatype', component: DataProfileDatatypeComponent },
      { path: 'data_profile_pattern', component: DataProfilePatternComponent },
      { path: 'data_profile_statistics', component: DataProfileStatisticsComponent },
      { path: 'data_profile_values', component: DataProfileValuesComponent },
      { path: 'factsheet_detail', component: FactsheetDetailComponent },
      { path: 'factsheet_master', component: FactsheetMasterComponent },
      { path: 'rc_rl_template', component: RcRlTemplateComponent },
      { path: 'service_level_badge', component: ServiceLevelBadgeComponent },
      { path: 'service_level_badge1', component: ServiceLevelBadge1Component },
      { path: 'service_level_metric', component: ServiceLevelMetricComponent },
      { path: 'service_level_metric_master', component: ServiceLevelMetricMasterComponent },
      { path: 'service_level_metrics', component: ServiceLevelMetricsComponent },

      //CRUD
      { path: 'data-topic', component: DataTopicComponent },
      { path: 'restriction_rule_mgmt', component: RestrictionRuleMgmtComponent },
      { path: 'holidaycalendar_pmi', component: HolidaycalendarPmiComponent },
      { path: 'operational_metadata', component: OperationalMetadataComponent },
      { path: 'metadata_attributes', component: MetadataAttributesComponent },
      { path: 'target_mapping', component: TargetMappingComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
