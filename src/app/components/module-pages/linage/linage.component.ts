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
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {

    this.generateForm();
    this.businessService.getBusiness_term().subscribe({
      next: res => {

        res.data.map((dt: any) => {
          this.terms.push({ value: dt.business_term, desc: dt.business_term_description });
        });

        this.filteredOptionsSubTerm = this.FF['subject_business_term'].valueChanges.pipe(
          startWith(''),
          map((client) => (client ? filterAutocomplete(client, this.terms) : this.terms))
        );

        this.filteredOptionsSubTerm = this.FF['object_business_term'].valueChanges.pipe(
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
      id: this.UpdateData?.id || 0,
      subject_business_term: [this.UpdateData?.subject_business_term || ''],
      relationship: [this.UpdateData?.relationship || ''],
      operator: [this.UpdateData?.operator || ''],
      value: [this.UpdateData?.value || ''],
      object_business_term: [this.UpdateData?.object_business_term || ''],

    });
  }

  get FF(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  isFormValid = true;
  selectedRow:any;

  onSubmit() {
    if (this.formGroup.valid) {
      this.formGroup.value.date_created = formatDate(this.formGroup.value.date_created, 'yyyy-MM-dd', 'en');

      this.selectedRow ? this.updateService() : this.saveService();

    } else {
      this.isFormValid = false;
    }
  }

  saveService() {
    // this.businessTermService.saveBo_term(this.formGroup.value).subscribe(
    //   {
    //     next: res => {
    //       console.log(res)
    //       this.generateBusinessTermID();
    //       swalSuccess("Data inserted into business_term!")
    //     },
    //     error: err => swalError("Something went wrong!")
    //   }
    // );
  }

  updateService() {
    // const updatedData = {
    //   data: this.formGroup.value,
    //   conditions: {
    //     business_term_id: this.selectedRow.business_term_id
    //   }
    // };

    // this.businessTermService.updateBo_term(updatedData).subscribe({
    //   next: () => {
    //     swalSuccess('Business term updated successfully!');
    //     this.formGroup.reset();
    //     this.selectedRow = null;
    //     // this.generateBusinessTermID();

    //     this.formGroup.controls['date_created'].setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));


    //   },
    //   error: (error) => {
    //     console.error('Update failed', error);
    //     swalError('Failed to update the business term.');
    //   }
    // });
  }

  popUp_dialogRef?: MatDialogRef<LinagePopUpComponent>;
  openTermPopUp(popUpType: string) {
    this.popUp_dialogRef = this.dialog.open(LinagePopUpComponent,
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
        console.log(res)
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
