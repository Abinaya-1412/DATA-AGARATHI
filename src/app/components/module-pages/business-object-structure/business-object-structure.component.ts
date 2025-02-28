import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { BusinessService } from 'src/app/services/business.service';
import { ComboboxService } from 'src/app/services/combobox.service';
import { swalError, swalInfo, swalSuccess } from 'src/app/utils/alert';
import { filterAutocomplete } from 'src/app/utils/autocomplete';
import { NewItemComponent } from '../business-obj-definition/new-item/new-item.component';
import { BusinessStructureService } from 'src/app/services/business-structure.service';
import { NewBONameComponent } from '../business-obj-definition/new-bo-name/new-bo-name.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterPopUpComponent } from '../filter-pop-up/filter-pop-up.component';
import { BusinessObjectStructurePopUpComponent } from './business-object-structure-pop-up/business-object-structure-pop-up.component';

@Component({
  selector: 'app-business-object-structure',
  templateUrl: './business-object-structure.component.html',
  styleUrls: ['./business-object-structure.component.scss']
})

export class BusinessObjectStructureComponent {

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private businessStructureService: BusinessStructureService,
    private businessService: BusinessService,
    private comboboxService: ComboboxService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.getTable();
    this.getComboboxData();

    this.generateForm();
    this.keyUpBODefinition();

    this.activatedRoute.paramMap.subscribe({
      next: (res: any) => res.params ? (
        this.FF['business_object_id'].setValue(res.params.bo_id),
        this.FF['business_object_name'].setValue(res.params.bo_name),
        this.FF['project_name'].setValue(res.params.project_name),
        this.FF['business_object_description'].setValue(res.params.bo_desc)
      ) : null,
      error: err => console.log(err)
    })

  }

  definitionFormGroup!: FormGroup;

  generateForm() {
    this.definitionFormGroup = this.fb.group({
      // id: [this.UpdateData?.id || 0, [Validators.required]],
      project_name: [this.UpdateData?.project_name || '', [Validators.required]],
      business_object_name: [this.UpdateData?.business_object_name || '', [Validators.required]],
      business_object_id: [this.UpdateData?.business_object_id || '', [Validators.required]],
      business_object_description: [this.UpdateData?.business_object_description || '', [Validators.required]],
      business_attribute_id: [this.UpdateData?.business_attribute_id || '', [Validators.required]],
      business_attribute_name: [this.UpdateData?.business_attribute_name || '', [Validators.required]],
      business_attribute_definition: [this.UpdateData?.business_attribute_definition || '', [Validators.required]],
      information_sensitivity_classification: [this.UpdateData?.information_sensitivity_classification || '', [Validators.required]],
      information_sensitivity_type: [this.UpdateData?.information_sensitivity_type || '', [Validators.required]],
      information_protection_method: [this.UpdateData?.information_protection_method || '', [Validators.required]],
      business_data_type: [this.UpdateData?.business_data_type || '', [Validators.required]],
      business_attribute_length: [this.UpdateData?.business_attribute_length || 0, [Validators.required]],
      business_attribute_scale: [this.UpdateData?.business_attribute_scale || 0, [Validators.required]],
      is_business_key: [this.UpdateData?.is_business_key || '', [Validators.required, Validators.min(1)]],
      is_business_date: [this.UpdateData?.is_business_date || '', [Validators.required, Validators.min(1)]],
      is_mandatory: [this.UpdateData?.is_mandatory || '', [Validators.required, Validators.min(1)]],
      is_active: [this.UpdateData?.is_active || '', [Validators.required, Validators.min(1)]],
      created_updated_by: [this.UpdateData ? this.UpdateData.created_updated_by : '', [Validators.required]],
      created_updated_date: [this.UpdateData ? formatDate(this.UpdateData.created_updated_date, 'yyyy-MM-dd', 'en') : formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
      remarks: this.UpdateData ? this.UpdateData.remarks : '',
    });
  }

  get FF(): { [key: string]: AbstractControl } {
    return this.definitionFormGroup.controls;
  }

  filteredOptionsObjName?: Observable<any[]>;
  filteredOptionsClient?: Observable<any[]>;
  filteredOptionsBOIds?: Observable<any[]>;
  filteredOptionsBOAttributeIds?: Observable<any[]>;
  filteredOptionsBusiness_attribute_name?: Observable<any[]>;
  filteredOptionsInformation_sensitivity_classification?: Observable<any[]>;
  filteredOptionsInformation_sensitivity_type?: Observable<any[]>;
  filteredOptonsInformation_protection_method?: Observable<any[]>;
  filteredOptionsBusiness_data_type?: Observable<any[]>;

  filteredOptionsremarks?: Observable<any[]>;
  filteredOptioncreated_by?: Observable<any[]>;

  boNames: any[] = [];
  projectNames: any[] = [];
  boIds: any[] = [];
  boAttributeIds: any[] = [];
  businessAttrNames: any[] = [];
  infoSensitivityClassifications: any[] = [];
  infoSensitivityTypes: any[] = [];
  infoProtectionMethods: any[] = [];
  bussDataTypes: any[] = [];
  isBusinessKeys: any[] = [];
  isBusinessDates: any[] = [];
  isMandatorys: any[] = [];
  isActives: any[] = [];
  createdByList: any[] = [];
  remarks: any[] = [];

  keyUpBODefinition() {
    this.filteredOptionsClient = this.FF['project_name'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.projectNames) : this.projectNames))
    );

    this.filteredOptionsObjName = this.FF['business_object_name'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.boNames) : this.boNames))
    );

    this.filteredOptionsBOIds = this.FF['business_object_id'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.boIds) : this.boIds))
    );

    this.filteredOptionsBOAttributeIds = this.FF['business_attribute_id'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.boAttributeIds) : this.boAttributeIds))
    );

    this.filteredOptionsBusiness_attribute_name = this.FF['business_attribute_name'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.businessAttrNames) : this.businessAttrNames))
    );

    this.filteredOptionsInformation_sensitivity_classification = this.FF['information_sensitivity_classification'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.infoSensitivityClassifications) : this.infoSensitivityClassifications))
    );

    this.filteredOptionsInformation_sensitivity_type = this.FF['information_sensitivity_type'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.infoSensitivityTypes) : this.infoSensitivityTypes))
    );

    this.filteredOptonsInformation_protection_method = this.FF['information_protection_method'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.infoProtectionMethods) : this.infoProtectionMethods))
    );

    this.filteredOptionsBusiness_data_type = this.FF['business_data_type'].valueChanges.pipe(
      startWith(''),
      map((client) => (client ? filterAutocomplete(client, this.bussDataTypes) : this.bussDataTypes))
    );

  }


  getComboboxData() {

    this.businessService.getBusiness_term().subscribe({
      next: res => {
        res.data.map((dt: any) => {
          !this.boNames.some(item => item.value === dt.business_term) ? this.boNames.push({ value: dt.business_term }) : '';
          !this.businessAttrNames.some(item => item.value === dt.business_term) ? this.businessAttrNames.push({ value: dt.business_term }) : '';
        });
      },
      error: err => console.log(err)
    });


    // this.comboboxService.getSensitivity_classification().subscribe({
    //   next: res => {
    //     res.data.map((dt: any) => this.infoSensitivityClassifications.push({ value: dt.sensitivity_classification }))
    //   },
    //   error: err => console.log(err)
    // });

    // this.comboboxService.getSensitivity_reason_code().subscribe({
    //   next: res => {
    //     res.data.map((dt: any) => this.infoSensitivityTypes.push({ value: dt.sensitivity_reason_code }))
    //   },
    //   error: err => console.log(err)
    // });

    this.infoSensitivityClassifications = [
      {
        key: 'Secret',
        value: 'Secret'
      },
      {
        key: 'Confidential',
        value: 'Confidential'
      },
      {
        key: 'Public & Private',
        value: 'Public & Private'
      },
    ]

    this.infoSensitivityTypes = [
      {
        key: 'PII',
        value: 'PII'
      },
      {
        key: 'Competitive',
        value: 'Competitive'
      }
    ]

    this.businessService.getBusinessObjectDefinition().subscribe({
      next: res => {
        res.data.map((dt: any) => {
          !this.projectNames.some(item => item.value === dt.project_name) ? (dt.project_name ? this.projectNames.push({ value: dt.project_name }) : '') : '';
          !this.boIds.some(item => item.value === dt.business_object_id) ? (dt.business_object_id ? this.boIds.push({ value: dt.business_object_id }) : '') : '';
          !this.remarks.some(item => item.value === dt.remarks) ? (dt.remarks ? this.remarks.push({ value: dt.remarks }) : '') : '';
          !this.createdByList.some(item => item.value === dt.created_updated_by) ? (dt.created_updated_by ? this.createdByList.push({ value: dt.created_updated_by }) : '') : '';
        })
      },
      error: err => console.log(err)
    });


    this.isBusinessKeys = this.isBusinessDates = this.isMandatorys = this.isActives = [
      {
        key: '1',
        value: 'Yes'
      },
      {
        key: '2',
        value: 'No'
      },
    ]

    this.infoProtectionMethods = [
      {
        key: 'Encrypter',
        value: 'Encrypter'
      },
      {
        key: 'Masked',
        value: 'Masked'
      },
    ]

    this.bussDataTypes = [
      {
        key: 'AlphaNumeric',
        value: 'AlphaNumeric'
      },
      {
        key: 'AlphaOnly',
        value: 'AlphaOnly'
      },
      {
        key: 'WholeNumber',
        value: 'WholeNumber'
      },
      {
        key: 'FractionalNumber',
        value: 'FractionalNumber'
      },
      {
        key: 'Boolean',
        value: 'Boolean'
      },
      {
        key: 'Memo',
        value: 'Memo'
      },

    ]
  }

  UpdateData: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  activeRow: any = -1;
  highlightRowDataDtOwner: any;

  isActive = (index: number) => { return this.activeRow === index };

  highlight(index: number, id: number, row: any): void {
    if (!this.isActive(index)) {
      row != this.highlightRowDataDtOwner ? this.highlightRowDataDtOwner = row : this.highlightRowDataDtOwner = '';
      this.activeRow = index;
      this.UpdateData = row;
      this.generateForm();
    }
    else {
      this.UpdateData = '';
      this.generateForm();
      this.activeRow = -1;
      this.highlightRowDataDtOwner = '';
    }
  }

  onChangePage(event: PageEvent) {
  }

  initialBOD_ID = 0;
  getTable() {
    this.businessStructureService.getBo_structure().subscribe({
      next: res => {
        let BOD_ID = String(Number(res.data[res.data.length - 1]?.business_attribute_id.substring(3)) + 1);
        let BOD_last_value = res.data.length ? (BOD_ID.length == 1 ? 'BOS000' : (BOD_ID.length == 2 ? 'BOS00' : (BOD_ID.length == 3 ? 'BOS00' : 'BOS0'))) + BOD_ID : "BOS0001";
        this.FF['business_attribute_id'].setValue(BOD_last_value)
      },
      error: err => console.log(err)
    })
  }

  boName_dialogRef?: MatDialogRef<NewBONameComponent>;
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

  item_dialogRef?: MatDialogRef<NewItemComponent>;
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

  handleNew() {
    this.UpdateData = {
      project_name: this.FF['project_name'].value,
      business_object_name: this.FF['business_object_name'].value,
      business_object_id: this.FF['business_object_id'].value,
      business_attribute_id: '',
      business_attribute_name: '',
      business_attribute_definition: '',
      information_sensitivity_classification: '',
      information_sensitivity_type: '',
      information_protection_method: '',
      business_data_type: '',
      business_attribute_length: 0,
      business_attribute_scale: 0,
      is_business_key: '',
      is_business_date: '',
      is_mandatory: '',
      is_active: '',
      created_updated_by: '',
      created_updated_date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      remarks: '',
    };
    this.generateForm();
    this.getTable();
  }

  handleUpdate() {
    if (this.FF['business_object_id'].value && this.FF['business_attribute_id'].value) {
      this.updateForm();
    }
  }

  handleDelete() {
    if (this.FF['business_object_id'].value && this.FF['business_attribute_id'].value) {
      this.businessStructureService.deleteBo_structure(this.FF['business_object_id'].value, this.FF['business_attribute_id'].value).subscribe(
        {
          next: res => {
            swalSuccess("Row deleted from business object structure");
            this.handleNew();
          },
          error: err => console.log(err),
        }
      );
    }
  }

  popUp_dialogRef?: MatDialogRef<BusinessObjectStructurePopUpComponent>;
  selectedRow: any;
  openTermPopUp(popUpType: string) {
    this.popUp_dialogRef = this.dialog.open(BusinessObjectStructurePopUpComponent,
      {
        // disableClose: true,
        hasBackdrop: true,
        width: '80%',
        height: 'auto',
        autoFocus: false,
        data: {
          popUpType: popUpType
        }
      })

    this.popUp_dialogRef.afterClosed().subscribe({
      next: res => {
        res.data ? (
          this.selectedRow = res.data,
          this.UpdateData = res.data,
          this.generateForm()
        )
          : null
      }
    })
  }

  isFormValid = true;
  handleSaveForm() {
    if (this.definitionFormGroup.valid) {
      this.isFormValid = true;

      this.FF['business_object_id'].value != this.FF['business_attribute_definition'].value ?
        (
          !this.UpdateData ? this.saveForm() : this.updateForm()
        )
        : swalInfo("BO id and Business attribute definition can't be the same!")

      this.keyUpBODefinition();
    }
    else this.isFormValid = false;
  }

  updateForm() {
    let model = {
      data: this.definitionFormGroup.value,
      conditions: {
        business_object_id: this.UpdateData?.business_object_id,
        business_attribute_id: this.UpdateData?.business_attribute_id
      }
    }

    this.businessStructureService.updateBo_structure(model).subscribe({
      next: res => {
        swalSuccess('Updated successfully!');
        this.handleNew();
        this.activeRow = -1;
        this.highlightRowDataDtOwner = '';
      },
      error: err => swalError("Something went wrong in database"),
    })
  }

saveForm() {
  this.businessStructureService.saveBo_structure(this.definitionFormGroup.value).subscribe({
    next: res => {
      swalSuccess("Saved successfully.");
      this.handleNew();
    },
    error: err => swalError("Something went wrong in the database"),
  });
}

  tableData: any
  filter_dialogRef!: MatDialogRef<FilterPopUpComponent>;

  handleFilter() {
    this.filter_dialogRef = this.dialog.open(FilterPopUpComponent,
      {
        disableClose: true,
        width: '80%',
        height: 'auto',
        autoFocus: false,
        data: [
          { name: 'BO name', value: 'business_object_name' },
          { name: 'Business attribute id', value: 'business_attribute_id' },
          { name: 'Business attribute name', value: 'business_attribute_name' },
          { name: 'Business attribute definition', value: 'business_attribute_definition' },
          { name: 'Information sensitivity classification', value: 'information_sensitivity_classification' },
          { name: 'Information sensitivity type', value: 'information_sensitivity_type' },
          { name: 'Information protection method', value: 'information_protection_method' },
          { name: 'Business data type', value: 'business_data_type' },
          { name: 'Business attribute length', value: 'business_attribute_length' },
          { name: 'Business attribute scale', value: 'business_attribute_scale' },
          { name: 'Is business key', value: 'is_business_key' },
          { name: 'Is business date', value: 'is_business_date' },
          { name: 'Is mandatory', value: 'is_mandatory' },
          { name: 'Is active', value: 'is_active' },
          { name: 'Created updated by', value: 'created_updated_by' },
          { name: 'Created updated date', value: 'created_updated_date' },
          { name: 'Remarks', value: 'remarks' },
        ]
      });

    this.filter_dialogRef.afterClosed().subscribe({
      next: res => {
        this.activeRow = -1;
        this.highlightRowDataDtOwner = '';
        if (res) {
          this.dataSource = new MatTableDataSource<any>(this.applyFilters(this.tableData, res));
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

}
