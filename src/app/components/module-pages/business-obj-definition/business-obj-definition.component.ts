import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { last, map, Observable, startWith } from 'rxjs';
import { NewItemComponent } from './new-item/new-item.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filterAutocomplete } from 'src/app/utils/autocomplete';
import { BusinessService } from 'src/app/services/business.service';
import { swalError, swalInfo, swalSuccess } from 'src/app/utils/alert';
import { formatDate } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ComboboxService } from 'src/app/services/combobox.service';
import { ViewGridComponent } from './view-grid/view-grid.component';
import { MatTooltip } from '@angular/material/tooltip';
import { NewBONameComponent } from './new-bo-name/new-bo-name.component';
import { BusinessObjectStructureComponent } from '../business-object-structure/business-object-structure.component';
import { Router } from '@angular/router';
import { FilterPopUpComponent } from '../filter-pop-up/filter-pop-up.component';
import { SchemasService } from 'src/app/services/schemas.service';
import { DataOwnerComponent } from './data-owner/data-owner.component';
import { ImpleDataComponent } from './imple-data/imple-data.component';
import { BusinessRuleComponent } from './business-rule/business-rule.component';
import { BusinessTermComponent } from './business-term/business-term.component';
import { BusinessTermService } from 'src/app/services/business-term.service';

@Component({
  selector: 'app-business-obj-definition',
  templateUrl: './business-obj-definition.component.html',
  styleUrls: ['./business-obj-definition.component.scss']
})
export class BusinessObjDefinitionComponent {

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private businessService: BusinessService,
    private businessTermService: BusinessTermService,
    private comboboxService: ComboboxService,
    private schemasService: SchemasService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.getTableBusinessObjectDefinition(1);


    this.generateForm();
    this.generateDtOwnerForm();
    this.generateBusinessRulesFormGroup();
    this.generateSourceSystemFormGroup();
    this.generateBusinessTermFormGroup();

    this.keyUpOwner();
    this.keyUpBODefinition();
    this.keyUpImpDetails();
    this.keyUpBusinessAlternateRule();

  }
  selectedRow: any = null;
  activeRow: any; // Define the activeRow property
  objectTypes: any[] = [];
  paymentPurposeTypeIds: any[] = [];
  paymentMethodIds: any[] = [];
  filteredOptionsClient?: Observable<any[]>;
  filteredOptionsObjName?: Observable<any[]>;
  filteredOptionsdataDomain?: Observable<any[]>;
  filteredOptionsautoasset_type?: Observable<any[]>;
  filteredOptionssensitivity_classification?: Observable<any[]>;
  filteredOptionssensitivity_reason?: Observable<any[]>;

  filteredOptionsunitOwner?: Observable<any[]>;
  filteredOptionsbussFunc?: Observable<any[]>;
  filteredOptionsrole?: Observable<any[]>;

  filteredOptionssource_system?: Observable<any[]>;
  filteredOptionssource_system_country_code?: Observable<any[]>;
  filteredOptionsreq_frequency_of_refresh?: Observable<any[]>;
  filteredOptionsActive?: Observable<any[]>;
  filteredOptionsdata_capture_mode?: Observable<any[]>;
  filteredOptionssourcing_mode?: Observable<any[]>;
  filteredOptiontrack_history?: Observable<any[]>;
  filteredOptionshistory_type?: Observable<any[]>;
  filteredOptionserror_treatment?: Observable<any[]>;
  filteredOptionsexception_treatment?: Observable<any[]>;

  filteredOptionsremarks?: Observable<any[]>;
  filteredOptionsRule?: Observable<any[]>;
  filteredOptionsbusiness_Term?: Observable<any[]>;

  filteredOptioncreated_by?: Observable<any[]>;

  DataOwnerFormGroup!: FormGroup;
  definitionFormGroup!: FormGroup;
  SourceSystemFormGroup!: FormGroup;
  BusinessRulesFormGroup!: FormGroup;
  BusinessTermFormGroup!: FormGroup;

  UpdateData: any;
  isFormValid = true;

  treatmentTypes: any[] = [
    {
      key: 0,
      value: 'Stop'
    },
    {
      key: 1,
      value: 'Continue'
    },
  ];
  

  

  clients: any[] = [
    {
      key: 1,
      value: 'Test'
    },
    {
      key: 2,
      value: 'Test 2'
    },
    {
      key: 3,
      value: 'Meta'
    },
  ];

  boNames: any[] = [];
  assetsTypes: any[] = [];
  projectNames: any[] = [];
  scopeDataDomains: any[] = [];
  boAssestsTypes: any[] = [];
  sensitivityClassifications: any[] = [];
  sensitivityReasons: any[] = [];
  dataOwners: any[] = [];
  refreshFrequency: any[] = [];
  dataCaptureModes: any[] = [];
  sourcingModes: any[] = [];
  historyTypes: any[] = [];
  sourceSystems: any[] = [];

  createdByList: any[] = [];
  remarks: any[] = [];

  initialBOD_ID = 0;

  countryCodes: any[] = [];

  actives: any[] = [
    {
      key: 1,
      value: 'Yes'
    },
    {
      key: 0,
      value: 'No'
    },
  ];

  businessObjIds: any[] = [];

  ngOnInit() {
    this.getComboboxData();
  }


  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  validBOName(event: any) {
    if (event.keyCode == 45) return;
  }

  lastGeneratedID: string = 'BOT000';
  getComboboxData() {
    this.assetsTypes = [];
    this.dataOwners = [];
    this.sensitivityClassifications = [];
    this.sensitivityReasons = [];
    this.impDetailsData = [];
    this.businessRules = [];
    this.ruleData = [];
    this.termData = [];
    this.boNames = [];
    this.businessTerms = [];
    this.boOwnerData = [];
    this.businessUnitOwners = [];
    this.businessFunctions = [];
    this.projectNames = [];
    this.scopeDataDomains = [];
    this.remarks = [];
    this.createdByList = [];
    this.countryCodes = [];
    this.sourceSystems = [];

    this.businessService.getImpDetails().subscribe({
      next: res => {
        this.impDetailsData = res.data;
      },
      error: err => console.log(err)
    });

    this.businessService.getBusinessRule().subscribe({
      next: res => {
        this.ruleData = res.data;
        res.data.map((dt: any) => {
          !this.businessRules.some(item => item.value === dt.rule) ? this.businessRules.push({ value: dt.rule }) : '';
        })

        let rule_id = String(Number(res.data[res.data.length - 1]?.rule_id.substring(9)) + 1);

        let last_rule_id = (rule_id.length == 1 ? this.FF['business_object_id'].value + 'BR000' : (rule_id.length == 2 ? this.FF['business_object_id'].value + 'BR00' : (rule_id.length == 3 ? this.FF['business_object_id'].value + 'BR0' : ''))) + rule_id
        let BOD_last_value = res.data.length ? last_rule_id : this.FF['business_object_id'].value + 'BR' + "0001";
        this.BRF['rule_id'].setValue(BOD_last_value);
      },
      error: err => console.log(err)
    });

    // this.businessService.getBusiness_term().subscribe({
    //   next: res => {

    //     this.termData = res.data
    //     res.data.map((dt: any) => {
    //       !this.boNames.some(item => item.value === dt.business_term) ? this.boNames.push({ value: dt.business_term, desc: dt.business_term_description }) : '';
    //       !this.businessTerms.some(item => item.value === dt.business_term) ? this.businessTerms.push({ value: dt.business_term }) : '';
    //     });

    //     // let business_id = String(Number(res.data[res.data.length - 1]?.business_term_id.substring(9)) + 1);
    //     let BOD_ID = String(Number(res.data[res.data.length - 1]?.business_term_id.substring(2)) + 1);
    //     let BOD_last_value = res.data.length && Number(BOD_ID) ? ((BOD_ID.length == 1 ? 'BT000' : (BOD_ID.length == 2 ? 'BT00' : (BOD_ID.length == 3 ? 'BT00' : 'BT0'))) + BOD_ID) : "BT0001";

    //     this.BTF['business_term_id'].setValue(BOD_last_value) 
    //   },
    //   error: err => console.log(err)
    // });

    this.businessTermService.getBo_termForId().subscribe({
      next: res => {
        this.lastGeneratedID = res.length ? res[res.length - 1].business_term_id : 'BOT000'
        // Extract the numeric part of the ID from the last generated ID
        const numericID = parseInt(this.lastGeneratedID.replace('BOT', ''), 10) || 0;
        // Increment the numeric part and format with leading zeros
        const newIDNumber = numericID + 1;
        this.lastGeneratedID = `BOT${String(newIDNumber).padStart(3, '0')}`;

        // Update the form control with the new ID
        this.BTF['business_term_id'].setValue(this.lastGeneratedID);
      },
      error: err => console.error('Error fetching business terms', err),
    });

    this.businessService.getBo_owner().subscribe({
      next: res => {
        this.boOwnerData = res.data;
        res.data.map((dt: any) => {
          !this.businessUnitOwners.some(item => item.value === dt.business_unit_owner) ? this.businessUnitOwners.push({ value: dt.business_unit_owner }) : '';
          !this.businessFunctions.some(item => item.value === dt.business_function) ? this.businessFunctions.push({ value: dt.business_function }) : '';
        })
      },
      error: err => console.log(err)
    });

    this.businessService.getBusinessObjectDefinition().subscribe({
      next: res => {
        res.data.map((dt: any) => {
          !this.projectNames.some(item => item.value === dt.project_name) ? (dt.project_name ? this.projectNames.push({ value: dt.project_name }) : '') : '';
          !this.scopeDataDomains.some(item => item.value === dt.scope_of_data_domain) ? (dt.scope_of_data_domain ? this.scopeDataDomains.push({ value: dt.scope_of_data_domain }) : '') : '';
          !this.remarks.some(item => item.value === dt.remarks) ? (dt.remarks ? this.remarks.push({ value: dt.remarks }) : '') : '';
          !this.createdByList.some(item => item.value === dt.created_by) ? (dt.created_by ? this.createdByList.push({ value: dt.created_by }) : '') : '';
          !this.boNames.some(item => item.value === dt.business_object_name) ? (dt.business_object_name ? this.boNames.push({ value: dt.business_object_name }) : '') : '';
        })
      },
      error: err => console.log(err)
    });

    this.comboboxService.getCountry_codes().subscribe({
      next: res => {
        res.data.map((dt: any) => {
          !this.countryCodes.some(item => item.value === dt.Country_Codes) ? this.countryCodes.push({ value: dt.Country_Codes }) : '';
        })
      },
      error: err => console.log(err)
    });

    this.comboboxService.getSource_systems().subscribe({
      next: res => {
        res.data.map((dt: any) => {
          !this.sourceSystems.some(item => item.value === dt.Source_System_Code) ? this.sourceSystems.push({ value: dt.Source_System_Code }) : '';
        })
      },
      error: err => console.log(err)
    });


    this.schemasService.getAssetsTypes().subscribe({
      next: res => {
        res.map((dt: any) => {
          this.assetsTypes.push({ key: dt.ref_code, value: dt.ref_code });
        })
      },
      error: err => console.log(err)
    });
    this.schemasService.getTreatmentTypes().subscribe({
      next: res => {
        res.map((dt: any) => {
          this.treatmentTypes.push({ key: dt.ref_code, value: dt.ref_code });
        });
      },
      error: err => console.log(err)
    });
    
    
    
    this.dataOwners = [
      {
        key: 'Data Owner',
        value: 'Data Owner'
      },
      {
        key: 'Custodian',
        value: 'Custodian'
      },
      {
        key: 'Champion',
        value: 'Champion'
      },

    ]

    this.schemasService.getSensitivitys().subscribe({
      next: res => {
        res.map((dt: any) => {
          this.sensitivityClassifications.push({ key: dt.ref_code, value: dt.ref_code });
        })
      },
      error: err => console.log(err)
    });


    this.schemasService.getReasons().subscribe({
      next: res => {
        res.map((dt: any) => {
          this.sensitivityReasons.push({ key: dt.ref_code, value: dt.ref_code });
        })
      },
      error: err => console.log(err)
    });

    this.schemasService.getRefreshFrequency().subscribe({
      next: res => {
        res.map((dt: any) => {
          this.refreshFrequency.push({ key: dt.ref_code, value: dt.ref_code });
        })
      },
      error: err => console.log(err)
    });

    this.schemasService.getDataCaptureModes().subscribe({
      next: res => {
        res.map((dt: any) => {
          this.dataCaptureModes.push({ key: dt.ref_code, value: dt.ref_code });
        })
      },
      error: err => console.log(err)
    });
    this.schemasService.getHistoryTypes().subscribe({
      next: res => {
        res.map((dt: any) => {
          this.historyTypes.push({ key: dt.ref_code, value: dt.ref_code });
        })
      },
      error: err => console.log(err)
    });
    this.schemasService.getSourcingModes().subscribe({
      next: res => {
        res.map((dt: any) => {
          this.sourcingModes.push({ key: dt.ref_code, value: dt.ref_code });
        })
      },
      error: err => console.log(err)
    });

    
  }

  keyUpBODefinition() {
    this.filteredOptionsClient = this.FF['project_name'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.projectNames) : this.projectNames))
    );

    this.filteredOptionsObjName = this.FF['business_object_name'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.boNames) : this.boNames))
    );

    this.filteredOptionsdataDomain = this.FF['scope_of_data_domain'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.scopeDataDomains) : this.scopeDataDomains))
    );

    this.filteredOptionsautoasset_type = this.FF['business_object_asset_type'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.assetsTypes) : this.assetsTypes))
    );

    this.filteredOptionssensitivity_classification = this.FF['business_object_sensitivity_classification'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.sensitivityClassifications) : this.sensitivityClassifications))
    );

    this.filteredOptioncreated_by = this.FF['created_by'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.createdByList) : this.createdByList))
    );

    this.filteredOptionsremarks = this.FF['remarks'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.remarks) : this.remarks))
    );

    this.filteredOptionssensitivity_reason = this.FF['business_object_sensitivity_reason'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.sensitivityReasons) : this.sensitivityReasons))
    );
  }

  businessUnitOwners: any[] = [];
  businessFunctions: any[] = [];

  keyUpOwner() {
    this.filteredOptionsunitOwner = this.OF['business_unit_owner'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.businessUnitOwners) : this.businessUnitOwners))
    );

    this.filteredOptionsbussFunc = this.OF['business_function'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.businessFunctions) : this.businessFunctions))
    );

    this.filteredOptionsrole = this.OF['role'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.dataOwners) : this.dataOwners))
    );
  }

  keyUpImpDetails() {
    this.filteredOptionssource_system = this.SSF['source_system'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.sourceSystems) : this.sourceSystems))
    );

    this.filteredOptionssource_system_country_code = this.SSF['source_system_country_code'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.countryCodes) : this.countryCodes))
    );

    this.filteredOptionsreq_frequency_of_refresh = this.SSF['req_frequency_of_refresh'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.refreshFrequency) : this.refreshFrequency))
    );

    // this.filteredOptionsActive = this.SSF['active'].valueChanges.pipe(
    //   startWith(''),
    //   map((client) => (client ? filterAutocomplete(client, this.actives) : this.actives))
    // );

    this.filteredOptionsdata_capture_mode = this.SSF['data_capture_mode'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.dataCaptureModes) : this.dataCaptureModes))
    );

    this.filteredOptionssourcing_mode = this.SSF['sourcing_mode'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.sourcingModes) : this.sourcingModes))
    );

    this.filteredOptionshistory_type = this.SSF['history_type'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.historyTypes) : this.historyTypes))
    );

    this.filteredOptionserror_treatment = this.SSF['error_treatment'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.treatmentTypes) : this.treatmentTypes))
    );

    this.filteredOptionsexception_treatment = this.SSF['exception_treatment'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.treatmentTypes) : this.treatmentTypes))
    );
  }

  keyUpBusinessAlternateRule() {
    this.filteredOptionsRule = this.BRF['rule'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.businessRules) : this.businessRules))
    );

    this.filteredOptionsbusiness_Term = this.BTF['business_term'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.businessTerms) : this.businessTerms))
    );
  }
  //FORM CODES

  generateBusinessRulesFormGroup() {
    this.BusinessRulesFormGroup = this.fb.group({
      id: this.UpdateDataBussnRule ? this.UpdateDataBussnRule.id : 0,
      rule_id: [this.UpdateDataBussnRule ? this.UpdateDataBussnRule.rule_id : '', [Validators.required]],
      rule: [this.UpdateDataBussnRule ? this.UpdateDataBussnRule.rule : '', [Validators.required]],
      business_object_id: [this.UpdateDataBussnRule ? this.UpdateDataBussnRule.business_object_id : ''],
    })
  }

  generateDtOwnerForm() {
    this.DataOwnerFormGroup = this.fb.group({
      id: this.UpdateDataDtOwner ? this.UpdateDataDtOwner.id : 0,
      business_unit_owner: [this.UpdateDataDtOwner ? this.UpdateDataDtOwner.business_unit_owner : '', [Validators.required]],
      business_function: [this.UpdateDataDtOwner ? this.UpdateDataDtOwner.business_function : '', [Validators.required]],
      role: [this.UpdateDataDtOwner ? this.UpdateDataDtOwner.role : '', [Validators.required]],
      business_object_id: [this.UpdateDataDtOwner ? this.UpdateDataDtOwner.business_object_id : ''],
    })
  }

  generateSourceSystemFormGroup() {
    this.SourceSystemFormGroup = this.fb.group({
      id: this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.id : 0,
      source_system: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.source_system : '', [Validators.required]],
      source_system_country_code: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.source_system_country_code : '', [Validators.required]],
      req_frequency_of_refresh: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.req_frequency_of_refresh : '', [Validators.required]],
      active: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.active : '', [Validators.required]],
      data_capture_mode: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.data_capture_mode : '', [Validators.required]],
      sourcing_mode: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.sourcing_mode : '', [Validators.required]],
      track_history: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.track_history : '', [Validators.required]],
      history_type: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.history_type : '', [Validators.required]],
      error_treatment: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.error_treatment : '', [Validators.required]],
      exception_treatment: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.exception_treatment : '', [Validators.required]],
      business_object_id: [this.UpdateDataSrsSystem ? this.UpdateDataSrsSystem.business_object_id : ''],
    })
  }

  generateBusinessTermFormGroup() {
    this.BusinessTermFormGroup = this.fb.group({
      id: this.UpdateDataAlternateTerm ? this.UpdateDataAlternateTerm.id : 0,
      version: 0,
      date_created: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      active: 0,
      business_term_id: [this.UpdateDataAlternateTerm ? this.UpdateDataAlternateTerm.business_term_id : '', [Validators.required]],
      business_term: [this.UpdateDataAlternateTerm ? this.UpdateDataAlternateTerm.business_term : '', [Validators.required]],
      business_term_description: [this.UpdateDataAlternateTerm ? this.UpdateDataAlternateTerm.business_term_description : '', [Validators.required]],
      image_url: '',
      // business_object_id: [this.UpdateDataAlternateTerm ? this.UpdateDataAlternateTerm.business_object_id : ''],
      // business_termcol: [this.UpdateDataAlternateTerm ? this.UpdateDataAlternateTerm.business_termcol : ''],
    })

  }

  generateForm() {
    this.definitionFormGroup = this.fb.group({
      id: this.UpdateDataBusinessObjectDefinition?.id || 0,
      scope_of_data_domain: [this.UpdateDataBusinessObjectDefinition?.scope_of_data_domain || ''],
      project_name: this.UpdateDataBusinessObjectDefinition?.project_name || '',
      business_object_id: [this.UpdateDataBusinessObjectDefinition?.business_object_id || '', [Validators.required]],
      business_object_name: [this.UpdateDataBusinessObjectDefinition?.business_object_name || '', [Validators.required]],
      business_object_description: [this.UpdateDataBusinessObjectDefinition ? this.UpdateDataBusinessObjectDefinition.business_object_description : '', [Validators.required]],
      business_object_asset_type: [this.UpdateDataBusinessObjectDefinition ? this.UpdateDataBusinessObjectDefinition.business_object_asset_type : '', [Validators.required]],
      business_object_sensitivity_classification: [this.UpdateDataBusinessObjectDefinition ? this.UpdateDataBusinessObjectDefinition.business_object_sensitivity_classification : '', [Validators.required]],
      business_object_sensitivity_reason: [this.UpdateDataBusinessObjectDefinition ? this.UpdateDataBusinessObjectDefinition.business_object_sensitivity_reason : '', [Validators.required]],
      version: 0,
      active: true,
      created_by: [this.UpdateDataBusinessObjectDefinition ? this.UpdateDataBusinessObjectDefinition.created_by : '', [Validators.required]],
      date_created: [this.UpdateDataBusinessObjectDefinition ? formatDate(this.UpdateDataBusinessObjectDefinition.date_created, 'yyyy-MM-dd', 'en') : formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
      remarks: this.UpdateDataBusinessObjectDefinition ? this.UpdateDataBusinessObjectDefinition.remarks : '',
    });
  }

  get FF(): { [key: string]: AbstractControl } {
    return this.definitionFormGroup.controls;
  }

  get OF(): { [key: string]: AbstractControl } {
    return this.DataOwnerFormGroup.controls;
  }

  get SSF(): { [key: string]: AbstractControl } {
    return this.SourceSystemFormGroup.controls;
  }

  get BRF(): { [key: string]: AbstractControl } {
    return this.BusinessRulesFormGroup.controls;
  }

  get BTF(): { [key: string]: AbstractControl } {
    return this.BusinessTermFormGroup.controls;
  }

  @ViewChild("BONameTooltip") BONameTooltip!: MatTooltip;

  boNameChange() {
    // Hide the tooltip when typing
    this.BONameTooltip.disabled = true;
    this.BONameTooltip.hide();

    // Subscribe to filteredOptionsObjName and show tooltip if there are results
    this.filteredOptionsObjName?.subscribe(res => {
      if (res.length) {
        this.BONameTooltip.disabled = false;
        this.BONameTooltip.show();
      }
    });
  }


  setDescription() {
    this.FF['business_object_description'].setValue(this.boNames.filter((dt: any) => dt.value == this.FF['business_object_name'].value)[0].desc);
  }

  item_dialogRef?: MatDialogRef<NewItemComponent>;
  boName_dialogRef?: MatDialogRef<NewBONameComponent>;
  viewGrid_dialogRef?: MatDialogRef<ViewGridComponent>;

  addListValue(name: string) {
    this.item_dialogRef = this.dialog.open(NewItemComponent,
      {
        // disableClose: true,
        hasBackdrop: true,
        width: '45%',
        height: 'auto',
        autoFocus: false,
        data: {
          inputName: name
        }
      })

    this.item_dialogRef.afterClosed().subscribe({
      next: res => {
        this.getComboboxData();
      }
    })
  }

  addBONameList() {
    this.boName_dialogRef = this.dialog.open(NewBONameComponent,
      {
        // disableClose: true,
        hasBackdrop: true,
        width: '45%',
        height: 'auto',
        autoFocus: false,
        data: {
          bo_id: this.FF['business_object_id'].value
        }
      })

    this.boName_dialogRef.afterClosed().subscribe({
      next: res => {
        this.getComboboxData()
      }
    })
  }

  isBOFormValid = true;


  boOwnerData: any
  impDetailsData: any
  ruleData: any
  termData: any
  filter_dialogRef!: MatDialogRef<FilterPopUpComponent>;

  handleFilter() {
    this.filter_dialogRef = this.dialog.open(FilterPopUpComponent,
      {
        disableClose: true,
        width: '80%',
        height: 'auto',
        autoFocus: false,
        data: [
          { name: 'Project name', value: 'project_name' },
          { name: 'BO name', value: 'business_object_name' },
          { name: 'BO description', value: 'business_object_description' },
          { name: 'Scope of data domain', value: 'scope_of_data_domain' },
          { name: 'BO asset type', value: 'business_object_asset_type' },
          { name: 'BO sensitivity classification', value: 'business_object_sensitivity_classification' },
          { name: 'BO sensitivity reason', value: 'business_object_sensitivity_reason' },
          { name: 'Created/Updated by', value: 'created_by' },
          { name: 'Created/Updated date', value: 'date_created' },
          { name: 'Remarks', value: 'remarks' },

          { name: 'Business unit owner', value: 'business_unit_owner' },
          { name: 'Business function', value: 'business_function' },
          { name: 'Role', value: 'role' },

          { name: 'Source System', value: 'source_system' },
          { name: 'Source Sys. Country Code', value: 'source_system_country_code' },
          { name: 'Req Frequency of Refresh', value: 'req_frequency_of_refresh' },
          { name: 'Active', value: 'active' },
          { name: 'Data Capture Mode', value: 'data_capture_mode' },
          { name: 'Data Capture Mode', value: 'sourcing_mode' },
          { name: 'Track History', value: 'track_history' },
          { name: 'History Type', value: 'history_type' },
          { name: 'Error Treatment', value: 'error_treatment' },
          { name: 'Exception Treatment', value: 'exception_treatment' },

          { name: 'Rule', value: 'rule' },

          { name: 'Business term', value: 'business_term' },
          { name: 'Business term description', value: 'business_term_description' },
          { name: 'Version', value: 'version' },
        ]
      });

    this.filter_dialogRef.afterClosed().subscribe({
      next: res => {
        if (res) {
          this.dataSourceDtOwner = new MatTableDataSource<any>(this.applyFilters(this.boOwnerData, res));
          this.dataSourceSrcSystem = new MatTableDataSource<any>(this.applyFilters(this.impDetailsData, res));
          this.dataSourceBussnRule = new MatTableDataSource<any>(this.applyFilters(this.ruleData, res));
          this.dataSourceAltBusiness = new MatTableDataSource<any>(this.applyFilters(this.termData, res));
        }
      }
    })
  }

  filters: any[] = [];
  applyFilters(data: any[], filterData: any) {
    this.filters = this.getFilterValues(filterData, data);
    return data.filter((item) => {
      if (!this.filters || this.filters.length == 0) {
        return
      }
      return this.filters?.every((filter) => {
        if (item.hasOwnProperty(filter.columnName)) {
          return (
            (item as any)[filter.columnName]?.toString().toLowerCase() ===
            filter.value?.toString().toLowerCase()
          );
        }
        return false;
      });
    });
  }

  getFilterValues(filterForm: any, data: any[]) {
    this.filters = [];
    let filterArr: any[] = [];
    Object.keys(filterForm.controls).forEach((key: string) => {
      if (String(filterForm.get(key)?.value).length > 0) {
        filterArr?.push({
          columnName: key,
          value: filterForm.get(key)?.value,
        });
      }
    });

    filterArr.map((dt: any) => {
      data.every((filter) => {
        if (filter.hasOwnProperty(dt.columnName)) {
          this.filters.push(dt);
        }
      });
    })

    return this.filters
  }

  dataSourceBusinessOwner: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  dataSourceDtOwner: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  dataSourceSrcSystem: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  dataSourceBussnRule: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  dataSourceAltBusiness: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  dataSourceBusinessObjectDefinition: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  activeBusinessObjectDefinition: any = -1;
  activeBusinessOwner: any = -1;
  activeRowDtOwner: any = -1;
  activeRowSrcSystem: any = -1;
  activeRowBussnRule: any = -1;
  activeRowAltBusiness: any = -1;

  highlightRowDataBusinessOwner: any;
  highlightRowDataDtOwner: any;
  highlightRowDataSrcSystem: any;
  highlightRowDataBussnRule: any;
  highlightRowDataAltBusiness: any;

  onChangePageDtOwner(event: PageEvent) {
  }

  onChangePageSrcSystem(event: PageEvent) {
  }

  onChangePageBussnRule(event: PageEvent) {
  }

  onChangePageAltBusiness(event: PageEvent) {
  }

  isActiveBusinessOwner = (index: number) => { return this.activeRowSrcSystem === index };
  isActive = (tableIndex: number, index: number) => { return (tableIndex == 1 ? this.activeRowDtOwner : this.activeRowSrcSystem) === index };
  isActiveTerm = (tableIndex: number, index: number) => { return (tableIndex == 1 ? this.activeRowBussnRule : this.activeRowAltBusiness) === index };

  UpdateDataBusinessObjectDefinition: any;
  UpdateDataBusinessOwner: any;
  UpdateDataDtOwner: any;
  UpdateDataSrsSystem: any;
  UpdateDataBussnRule: any;
  UpdateDataAlternateTerm: any;

  highlight(tableIndex: number, index: number, id: number, row: any): void {
    if (tableIndex == 1) {
      if (!this.isActive(1, index)) {
        row != this.highlightRowDataDtOwner ? this.highlightRowDataDtOwner = row : this.highlightRowDataDtOwner = '';
        this.activeRowDtOwner = index;
        this.UpdateDataDtOwner = row;
        this.generateDtOwnerForm();
      }
      else {
        this.UpdateDataDtOwner = '';
        this.generateDtOwnerForm();
        this.activeRowDtOwner = -1;
        this.highlightRowDataDtOwner = '';
      }
    }

    else if (tableIndex == 2) {
      if (!this.isActive(2, index)) {
        row != this.highlightRowDataSrcSystem ? this.highlightRowDataSrcSystem = row : this.highlightRowDataSrcSystem = '';
        this.activeRowSrcSystem = index;
        this.UpdateDataSrsSystem = row;
        this.generateSourceSystemFormGroup();
      }
      else {
        this.UpdateDataSrsSystem = '';
        this.generateSourceSystemFormGroup();
        this.activeRowSrcSystem = -1;
        this.UpdateDataSrsSystem = '';
      }
    }

    else if (tableIndex == 3) {
      if (!this.isActiveBusinessOwner(index)) {
        row != this.highlightRowDataBusinessOwner ? this.highlightRowDataBusinessOwner = row : this.highlightRowDataBusinessOwner = '';
        this.activeBusinessOwner = index;
        this.UpdateDataBusinessOwner = row;
        this.generateForm();
      }
      else {
        this.activeBusinessOwner = -1;
        this.UpdateDataBusinessOwner = '';
        this.generateForm();
      }
    }

  }

  highlightTerm(tableIndex: number, index: number, id: number, row: any): void {
    if (tableIndex == 1) {
      if (!this.isActiveTerm(1, index)) {
        row != this.highlightRowDataBussnRule ? this.highlightRowDataBussnRule = row : this.highlightRowDataBussnRule = '';
        this.activeRowBussnRule = index;
        this.UpdateDataBussnRule = row;
        this.generateBusinessRulesFormGroup();
      }
      else {
        this.UpdateDataBussnRule = '';
        this.generateBusinessRulesFormGroup();
        this.activeRowBussnRule = -1;
        this.highlightRowDataBussnRule = '';
        // this.getTableBusinessRule();
      }
    }

    if (tableIndex == 2) {
      if (!this.isActiveTerm(2, index)) {
        row != this.highlightRowDataAltBusiness ? this.highlightRowDataAltBusiness = row : this.highlightRowDataAltBusiness = '';
        this.activeRowAltBusiness = index;
        this.UpdateDataAlternateTerm = row;
        this.generateBusinessTermFormGroup();
      }
      else {
        this.UpdateDataAlternateTerm = '';
        this.generateBusinessTermFormGroup();
        this.activeRowAltBusiness = -1;
        this.highlightRowDataAltBusiness = '';
      }
    }
  }

  displayedColumnBusinessOwner: any = {
    columns: [
      'business_unit_owner',
      'business_function',
      'role',
      '#',
    ],
    columnsTranslates: ['Business Unit Owner', 'Business Function', 'Role', '#']
  };

  displayedColumnsDtOwner: any = {
    columns: [
      'business_unit_owner',
      'business_function',
      'role',
      '#',
    ],
    columnsTranslates: ['Business Unit Owner', 'Business Function', 'Role', '#']
  };

  displayedColumnsSrcSystem: any = {
    columns: [
      'source_system',
      'source_system_country_code',
      'req_frequency_of_refresh',
      'active',
      'data_capture_mode',
      'sourcing_mode',
      'track_history',
      'history_type',
      'error_treatment',
      'exception_treatment',
      '#',
    ],
    columnsTranslates: [
      'Source System',
      'Source Sys. Country Code',
      'Req Frequency of Refresh',
      'Active',
      'Data Capture Mode',
      'Sourcing Mode',
      'Track History ',
      'History Type',
      'Error Treatment',
      'Exception  Treatment',
      '#',
    ]
  };

  displayedColumnsBussnRule: any = {
    columns: ['rule_id', 'rule', '#'],
    columnsTranslates: ['Rule Id', 'Rule', '#']
  };

  displayedColumnsAltBusiness: any = {
    columns: ['business_term_id', 'business_term', 'business_term_description', '#'],
    columnsTranslates: ['Business Term ID', 'Business Term', 'Business Term description', '#']
  };

  pageEvent!: PageEvent;
  lengthDtOwner?: number;
  lengthSrcSystem?: number;
  lengthBussnRule?: number;
  lengthAltBusiness?: number;
  pageSize!: number;
  pageSizeOptions: number[] = [20, 30, 40];
  @ViewChild('commonPagDtOwner') commonPaginator!: MatPaginator;
  @ViewChild('commonPagSrcSystem') commonPaginatorSrcSystem!: MatPaginator;
  @ViewChild('commonPagBussnRule') commonPaginatorBussnRule!: MatPaginator;
  @ViewChild('commonPagAltBusiness') commonPaginatorAltBusiness!: MatPaginator;

  //ADD DATA OWNER
  isDataOwnerFormValid = true;
  handleAddOwner() {
    if (this.DataOwnerFormGroup.valid) {
      this.isDataOwnerFormValid = true;

      // this.highlightRowDataDtOwner ? (
      //   this.updateDataOwner(),
      //   this.dataSourceDtOwner.paginator = this.commonPaginator

      // ) : (
      this.saveDataOwner();
      this.dataSourceDtOwner.paginator = this.commonPaginator
      // )
      this.UpdateDataDtOwner = '';
      this.generateDtOwnerForm();
      this.activeRowDtOwner = -1;
      this.highlightRowDataDtOwner = '';
      this.keyUpOwner();
    }
    else this.isDataOwnerFormValid = false

  }

  handleDeleteOwner(id: number) {
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
        this.businessService.deleteBo_owner(id).subscribe({
          next: res => {
            swalSuccess('Deleted successfully!');
            // this.getTableDataOwner();
            this.UpdateDataDtOwner = '';
            this.generateDtOwnerForm();
            this.activeRowDtOwner = -1;
            this.highlightRowDataDtOwner = '';
          },
          error: err => console.log(err)
        });
      }
    })
  }

  // getTableDataOwner() {
  //   this.businessService.getBo_ownerRelatedTable(this.FF['business_object_id'].value).subscribe({
  //     next: res => {
  //       this.dataSourceDtOwner = new MatTableDataSource<any>(res.data);
  //       this.dataSourceDtOwner.paginator = this.commonPaginator;
  //     },
  //     error: err => console.log(err)
  //   })
  // }

  saveDataOwner() {
    this.OF['business_object_id'].setValue(this.FF['business_object_id'].value);
    this.businessService.saveBo_owner(this.DataOwnerFormGroup.value).subscribe({
      next: res => {
        swalSuccess("Saved successfully.");
        this.UpdateDataDtOwner = '';
        this.generateDtOwnerForm();
        // this.getTableDataOwner();
      },
      error: err => swalError("Something went wrong in database!")
    })
  }

  updateDataOwner() {
    this.businessService.updateBo_owner(this.UpdateDataDtOwner.id, this.DataOwnerFormGroup.value).subscribe({
      next: res => {
        swalSuccess('Updated successfully!');
        this.UpdateDataDtOwner = '';
        this.generateDtOwnerForm();
        // this.getTableDataOwner();
      },
      error: err => console.log(err)
    })
  }

  dataOwner_dialogRef?: MatDialogRef<DataOwnerComponent>;
  showDataOwner(type: string) {
    this.dataOwner_dialogRef = this.dialog.open(DataOwnerComponent,
      {
        disableClose: true,
        // hasBackdrop: true,
        width: '90%',
        height: 'auto',
        autoFocus: false,
        data: {
          type: type,
          business_id: this.FF['business_object_id'].value
        }
      })

    this.dataOwner_dialogRef.afterClosed().subscribe({
      next: res => {
        this.getComboboxData();
        if (res) {
          this.highlightRowDataDtOwner = res;
          this.UpdateDataDtOwner = res;
          this.generateDtOwnerForm();
        }
      }
    })
  }

  isImpDetailsFormGroup = true;
  handleAddImpDetails() {
    if (this.SourceSystemFormGroup.valid) {
      this.isImpDetailsFormGroup = true;

      this.saveImpDetails();
      this.dataSourceSrcSystem.data = this.dataSourceSrcSystem.data

      this.UpdateDataSrsSystem = '';
      this.generateSourceSystemFormGroup();
      this.activeRowSrcSystem = -1;
      this.highlightRowDataSrcSystem = '';
      this.keyUpImpDetails();
    }
    else this.isImpDetailsFormGroup = false;
  }

  // getTableImpDetails() {
  //   this.businessService.getImplementationsRelatedTable(this.FF['business_object_id'].value).subscribe({
  //     next: res => {
  //       this.dataSourceSrcSystem = new MatTableDataSource<any>(res.data);
  //       this.dataSourceSrcSystem.paginator = this.commonPaginatorSrcSystem;
  //     },
  //     error: err => console.log(err)
  //   })
  // }

  updateImpDetails() {
    this.businessService.updateImpDetails(this.UpdateDataSrsSystem.business_object_id, this.SourceSystemFormGroup.value).subscribe({
      next: res => {
        swalSuccess('Updated successfully!');
        // this.getTableImpDetails();
      },
      error: err => console.log(err)
    })
  }

  saveImpDetails() {
    this.SSF['business_object_id'].setValue(this.FF['business_object_id'].value);
    this.businessService.saveImpDetails(this.SourceSystemFormGroup.value).subscribe({
      next: res => {
        swalSuccess("Saved successfully.");
        // this.getTableImpDetails();
      },
      error: err => swalError("Something went wrong in database!")
    })
  }

  deleteImpDetails() {
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
        this.businessService.deleteImpDetails(this.UpdateDataSrsSystem.business_object_id).subscribe({
          next: res => {
            swalSuccess('Deleted successfully!');
            this.UpdateDataSrsSystem = '';
            this.generateSourceSystemFormGroup();
          },
          error: err => console.log(err)
        });
      }
    })
  }

  impDetails_dialogRef?: MatDialogRef<ImpleDataComponent>;
  showImpDetails(type: string) {
    this.impDetails_dialogRef = this.dialog.open(ImpleDataComponent,
      {
        disableClose: true,
        // hasBackdrop: true,
        width: '90%',
        height: 'auto',
        autoFocus: false,
        data: {
          type: type,
          business_id: this.FF['business_object_id'].value
        }
      })

    this.impDetails_dialogRef.afterClosed().subscribe({
      next: res => {
        console.log(res)
        this.getComboboxData();
        if (res) {
          this.highlightRowDataSrcSystem = res;
          this.UpdateDataSrsSystem = res;
          this.generateSourceSystemFormGroup();
        }
      }
    })
  }

  // getTableBusinessRule() {
  //   this.businessService.getBo_rulesTable(this.FF['business_object_id'].value).subscribe({
  //     next: res => {
  //       this.dataSourceBussnRule = new MatTableDataSource<any>(res.data);
  //       this.dataSourceBussnRule.paginator = this.commonPaginatorBussnRule;
  //     },
  //     error: err => console.log(err)
  //   })
  // }

  isValidBussRule = true;
  handleAddBussRule() {
    if (this.BusinessRulesFormGroup.valid) {
      this.isValidBussRule = true;

      this.saveBusinessRule();
      this.dataSourceBussnRule.paginator = this.commonPaginatorBussnRule

      this.UpdateDataBussnRule = '';
      this.generateBusinessRulesFormGroup();
      this.activeRowBussnRule = -1;
      this.highlightRowDataBussnRule = '';
      this.keyUpBusinessAlternateRule();
    }
    else this.isValidBussRule = false
  }

  updateBusinessRule() {
    this.businessService.updateBusinessRule(this.UpdateDataBussnRule.business_object_id, this.BusinessRulesFormGroup.value).subscribe({
      next: res => {
        swalSuccess('Saved successfully');
        // this.getTableBusinessRule();
      },
      error: err => console.log(err)
    })
  }


  deleteBusinessRule() {
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
        this.businessService.deleteBusinessRule(this.UpdateDataBussnRule.business_object_id).subscribe({
          next: res => {
            swalSuccess('Deleted successfully!');
            this.UpdateDataBussnRule = '';
            this.generateBusinessRulesFormGroup();
          },
          error: err => console.log(err)
        });
      }
    })
  }

  saveBusinessRule() {
    this.BRF['business_object_id'].setValue(this.FF['business_object_id'].value);
    this.businessService.saveBusinessRule(this.BusinessRulesFormGroup.value).subscribe({
      next: res => {
        swalSuccess('Saved successfully');
        // this.getTableBusinessRule();
        this.getComboboxData();
      },
      error: err => swalError("Something went wrong in database!")
    })
  }

  bussnRule_dialogRef?: MatDialogRef<BusinessRuleComponent>;
  showBussnRule(type: string) {
    this.bussnRule_dialogRef = this.dialog.open(BusinessRuleComponent,
      {
        disableClose: true,
        // hasBackdrop: true,
        width: '90%',
        height: 'auto',
        autoFocus: false,
        data: {
          type: type,
          business_id: this.FF['business_object_id'].value
        }
      })

    this.bussnRule_dialogRef.afterClosed().subscribe({
      next: res => {
        this.getComboboxData();
        if (res) {
          this.highlightRowDataBussnRule = res;
          this.UpdateDataBussnRule = res;
          this.generateBusinessRulesFormGroup();
        }
      }
    })
  }


  isALtTermFormValid = true;
  handleAddAltTerm() {
    if (this.BusinessTermFormGroup.valid) {
      this.isALtTermFormValid = true;

      this.saveAltTerm();
      this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness

      this.UpdateDataAlternateTerm = '';
      this.generateBusinessTermFormGroup();
      this.activeRowAltBusiness = -1;
      this.highlightRowDataAltBusiness = '';
      this.keyUpBusinessAlternateRule();
    }
    else this.isALtTermFormValid = false;
  }

  deleteAltTerm() {
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
        this.businessService.deleteBusiness_term(this.UpdateDataAlternateTerm.business_term_id).subscribe({
          next: res => {
            swalSuccess('Deleted successfully!');
            this.UpdateDataAlternateTerm = '';
            this.generateBusinessTermFormGroup();
            // this.getTableBusinessObjectDefinition();
          },
          error: err => console.log(err)
        });
      }
    })
  }

  updateAltTerm() {
    this.businessService.updateBusiness_term(this.UpdateDataAlternateTerm.business_term_id, this.BusinessTermFormGroup.value).subscribe({
      next: res => {
        swalSuccess('Updated successfully!');
        this.UpdateDataAlternateTerm = '';
        this.generateBusinessTermFormGroup();
      },
      error: err => console.log(err)
    }),
      this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness
  }

  saveAltTerm() {
    this.businessService.saveBusiness_term(this.BusinessTermFormGroup.value).subscribe({
      next: res => {
        swalSuccess("Saved successfully.");
        // this.getTableBusinessTerm();
        this.getComboboxData();
      },
      error: err => swalError("Something went wrong in database!")
    });
  }

  businessRules: any[] = [];
  businessTerms: any[] = [];

  businessTerm_dialogRef?: MatDialogRef<BusinessTermComponent>;
  selectRow(row: any) { this.selectedRow = row; }
  showBusinessTerm(type: string) {
    this.businessTerm_dialogRef = this.dialog.open(BusinessTermComponent,
      {
        disableClose: true,
        // hasBackdrop: true,
        width: '90%',
        height: 'auto',
        autoFocus: false,
        data: {
          type: type,
          business_id: this.FF['business_object_id'].value
        }
      })

    this.businessTerm_dialogRef.afterClosed().subscribe({
      next: res => {
        this.getComboboxData();
        if (res) {
          this.UpdateDataAlternateTerm = res;
          this.generateBusinessTermFormGroup();
          this.highlightRowDataAltBusiness = res;
        }
      }
    })
  }


  handleCreateNewBO() {
    this.UpdateDataBusinessObjectDefinition = ''
    this.generateForm();
    this.getTableBusinessObjectDefinition(1);
  }

  isBusinessObjectDefinitionFormValid = true;
  handleSaveBusinessObjectDefinition() {
    if (this.definitionFormGroup.valid) {
      this.isBusinessObjectDefinitionFormValid = true;

      this.FF['business_object_name'].value != this.FF['business_object_description'].value ?
        (
          this.saveBusinessObjectDefinition(),
          // !this.UpdateDataBusinessObjectDefinition ? this.saveBusinessObjectDefinition() : this.updateBusinessObjectDefinition(),
          this.dataSourceAltBusiness.paginator = this.commonPaginatorAltBusiness
        )
        : swalInfo("BO name and BO description can't be the same!")

      this.keyUpBODefinition();
    }
    else this.isBusinessObjectDefinitionFormValid = false;
  }

  updateBusinessObjectDefinition() {
    let model = {
      data: this.definitionFormGroup.value,
      conditions: {
        id: this.UpdateDataBusinessObjectDefinition.id
      }
    }

    this.businessService.updateBusinessObjectDefinition(model).subscribe({
      next: res => {
        swalSuccess('Updated successfully!');
        this.getTableBusinessObjectDefinition(0);
      },
      error: err => swalError("Something went wrong in database!"),
    })
  }

  saveBusinessObjectDefinition() {
    this.businessService.saveBusinessObjectDefinition(this.definitionFormGroup.value).subscribe({
      next: res => {
        swalSuccess("Saved successfully.");
        this.getTableBusinessObjectDefinition(0);
      },
      error: err => swalError("Something went wrong in database!"),
    });
  }

  getTableBusinessObjectDefinition(index: number) {
    this.businessObjIds = [];
    this.businessService.getBusinessObjectDefinition().subscribe({
      next: res => {
        if (index == 1) { // only work ngOnInit and Refresh page
          let BOD_ID = String(Number(res.data[res.data.length - 1]?.business_object_id.substring(3)) + 1);
          let BOD_last_value = res.data.length ? (BOD_ID.length == 1 ? 'BOD000' : (BOD_ID.length == 2 ? 'BOD00' : (BOD_ID.length == 3 ? 'BOD00' : 'BOD0'))) + BOD_ID : "BOD0001";
          this.FF['business_object_id'].setValue(BOD_last_value)
          this.initialBOD_ID = this.FF['business_object_id'].value;
        } else {
          this.FF['business_object_id'].setValue(this.initialBOD_ID)
        }
      },
      error: err => console.log(err)
    })
  }


  addBOS() {
    this.FF['business_object_id'].value && this.FF['business_object_name'].value && this.FF['project_name'].value ?
      this.router.navigate(['../pages/structure', { bo_id: this.FF['business_object_id'].value, bo_name: this.FF['business_object_name'].value, bo_desc: this.FF['business_object_description'].value, project_name: this.FF['project_name'].value }])
      :
      swalInfo('You need Project name, Business object name, Business object ID to add Busines Object Structure');
  }

  // selectedRow: any;
  showGrid(type: string) {
    this.viewGrid_dialogRef = this.dialog.open(ViewGridComponent,
      {
        disableClose: true,
        // hasBackdrop: true,
        width: '90%',
        height: 'auto',
        autoFocus: false,
        data: type
      })

    this.viewGrid_dialogRef.afterClosed().subscribe({
      next: res => {
        this.getComboboxData();
        if (res) {

          this.UpdateDataBusinessObjectDefinition = res;
          this.generateForm();

          // this.getTableBusinessTerm()
          // this.getTableBusinessRule();
          // this.getTableImpDetails();
          // this.getTableDataOwner();
        }
      }
    })
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
            this.UpdateDataBusinessObjectDefinition = '';
            this.generateForm();
          },
          error: err => swalError('Something went wrong in database!')
        });
      }
    });
  }




}
