import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { BusinessService } from 'src/app/services/business.service';
import { ComboboxService } from 'src/app/services/combobox.service';
import { SchemasService } from 'src/app/services/schemas.service';
import { filterAutocomplete } from 'src/app/utils/autocomplete';
import { LinagePopUpComponent } from './linage-pop-up/linage-pop-up.component';
import { MappingService } from 'src/app/services/mapping.service';
import { swalError, swalSuccess } from 'src/app/utils/alert';

@Component({
  selector: 'app-linage',
  templateUrl: './linage.component.html',
  styleUrls: ['./linage.component.scss']
})
export class LinageComponent {
  formGroup!: FormGroup;
  filteredOptionsObjName?: Observable<any[]>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private businessService: BusinessService,
    private comboboxService: ComboboxService,
    private schemasService: SchemasService,
    private mappingService: MappingService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {

    this.generateForm();
    this.autocompleteFill();
  }

  autocompleteFill() {
    this.businessService.getBusiness_term().subscribe({
      next: res => {

        res.data.map((dt: any) => {
          this.terms.push({ value: dt.business_term, desc: dt.business_term_description });
        });

        this.filteredOptionsSubTerm = this.FF['subject_business_term'].valueChanges.pipe(
          startWith(''),
          map((client) => (client ? filterAutocomplete(client, this.terms) : this.terms))
        );

        this.filteredOptionsObjTerm = this.FF['object_business_term'].valueChanges.pipe(
          startWith(''),
          map((client) => (client ? filterAutocomplete(client, this.terms) : this.terms))
        );
      },
      error: err => console.log(err)
    });
  }


  filteredOptionsSubTerm!: Observable<any[]>;
  filteredOptionsObjTerm!: Observable<any[]>;
  terms: any[] = [];
  relationships: any[] = [
    {
      key: 'Is Sames As',
      value: 'Is Sames As',
    },
    {
      key: 'Is Parent Of',
      value: 'Is Parent Of',
    },
    {
      key: 'Is a Grouping of',
      value: 'Is a Grouping of',
    },
    {
      key: 'Is derived from ',
      value: 'Is derived from ',
    },
  ];

  operators: any[] = [];

  UpdateData: any;
  generateForm() {
    this.formGroup = this.fb.group({
      // id: this.UpdateData?.id || 0,
      subject_business_term: [this.UpdateData?.subject_business_term || '', Validators.required],
      relationship: [this.UpdateData?.relationship || '', Validators.required],
      operator: [this.UpdateData?.operator || '', Validators.required],
      value: [this.UpdateData?.value || '', Validators.required],
      object_business_term: [this.UpdateData?.object_business_term || '', Validators.required],
    });
  }

  get FF(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  ngOnInit() {
    this.comboboxService.getOperators().subscribe({
      next: res => {
        res.map((dt: any) => this.operators.push({ key: dt.operator, value: dt.operator }))
      }
    })
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  isFormValid = true;
  selectedRow: any;

  onSubmit() {
    console.log(this.formGroup.value)
    if (this.formGroup.valid) {
      this.selectedRow ? this.updateService() : this.saveService();
    } else {
      this.isFormValid = false;
    }
  }

  saveService() {
    this.mappingService.save(this.formGroup.value).subscribe({
      next: res => {
        res.message ? swalSuccess(res.message) : swalError(res.error)
      },
      error: err => swalError("Duplicate entry or something went wrong in database!")
    })
  }

  updateService() {
    this.mappingService.update(this.FF['subject_business_term'].value,this.formGroup.value).subscribe({
      next: res => {
        res.message ? swalSuccess(res.message) : swalError(res.error)
      },
      error: err => swalError("Duplicate entry or something went wrong in database!")
    })
  }

  popUp_dialogRef?: MatDialogRef<LinagePopUpComponent>;
  openTermPopUp(popUpType: string) {
    this.popUp_dialogRef = this.dialog.open(LinagePopUpComponent,
      {
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
        res ? (
          this.selectedRow = res,
          this.UpdateData = res,
          this.generateForm()
        )
          : null
      }
    })
  }

}
