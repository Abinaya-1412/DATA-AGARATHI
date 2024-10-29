import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { BusinessTermService } from 'src/app/services/business-term.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { formatDate } from '@angular/common';
import { swalError, swalSuccess } from 'src/app/utils/alert';

@Component({
  selector: 'app-business-term',
  templateUrl: './business-term.component.html',
  styleUrls: ['./business-term.component.scss']
})
export class BusinessTermComponent implements OnInit {
  definitionFormGroup: FormGroup;
  filteredOptionsBTerm = new BehaviorSubject<any[]>([]);
  filteredOptionsBTDesc = new BehaviorSubject<any[]>([]);
  displayedColumn = {
    columnsTranslates: ['Business Term ID', 'Business Term', 'Description', 'Version', 'Date Created', 'Active', 'ID', '#'],
    columns: ['business_term_id', 'business_term', 'business_term_description', 'version', 'date_created', 'active', 'id', 'actions']
  };
  dataSource = new MatTableDataSource<any>([]);

  pageSizeOptions = [10, 15, 20];
  length = 100;
  pageSize = 10;
  businessTermCounter = 1;
  currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  lastGeneratedID: string = 'BOT000'; 
  selectedRow: any;
  constructor(
    private fb: FormBuilder,
    private businessTermService: BusinessTermService
  ) {
    this.definitionFormGroup = this.fb.group({
      business_term_id: ['', Validators.required],
      business_term: ['', Validators.required],
      business_term_description: ['', Validators.required],
      version: ['', Validators.required],
      date_created: [this.currentDate, Validators.required],
      active: ['', Validators.required],
      id: 0
    });
  }

  ngOnInit(): void {
    this.fetchBusinessTermData();
    this.generateBusinessTermID(); 
    this.fetchBusinessTerms(); 
    
  }

  fetchBusinessTermData() {
    this.businessTermService.getBo_term().subscribe(response => {
      this.dataSource.data = response.data;
    }, (error) => {
      console.error('Error fetching business terms', error);
    });
  }
  generateBusinessTermID() {
    // Extract the numeric part of the ID from the last generated ID
    const numericID = parseInt(this.lastGeneratedID.replace('BOT', ''), 10) || 0;
  
    // Increment the numeric part and format with leading zeros
    const newIDNumber = numericID + 1;
    this.lastGeneratedID = `BOT${String(newIDNumber).padStart(3, '0')}`;
  
    // Update the form control with the new ID
    this.definitionFormGroup.controls['business_term_id'].setValue(this.lastGeneratedID);
  }
  
  fetchBusinessTerms() {
    this.businessTermService.getBo_term().subscribe(response => {
      this.filteredOptionsBTerm.next(response.data); 
    });
  }
  filterBusinessTerms(value: string) {
    if (value === '') {
      this.definitionFormGroup.patchValue({ business_term_description: '' });
    }

    const filtered = this.filteredOptionsBTerm.value.filter(term =>
      term.business_term.toLowerCase().startsWith(value.toLowerCase())
    );

    // Update the filtered options
    this.filteredOptionsBTerm.next(filtered);
  }
  onBusinessTermInput(event: any) {
    const inputValue = event.target.value.toLowerCase();

    if (inputValue === '') {
      this.definitionFormGroup.patchValue({ business_term_description: '' });
    }

    const filtered = this.filteredOptionsBTerm.value.filter(term =>
      term.business_term.toLowerCase().startsWith(inputValue)
    );

    this.filteredOptionsBTerm.next(filtered);
  }

  // Update the business_term_description based on the selected term
  onBusinessTermSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedTerm = event.option.value;
    if (!selectedTerm) {
      this.definitionFormGroup.patchValue({
        business_term_description: ''
      });
      return;
    }
    const selected = this.filteredOptionsBTerm.value.find(term => term.business_term === selectedTerm);
    if (selected) {
      this.definitionFormGroup.patchValue({
        business_term_description: selected.business_term_description
      });
    }
  }

  actives = [
    {
      key: 1,
      value: 'Yes'
    },
    {
      key: 2,
      value: 'No'
    },
  ]
  // Method to select a row and populate form
  onRowSelect(row: any): void {
    this.selectedRow = row;
    this.definitionFormGroup.patchValue({
      business_term_id: row.business_term_id,
      business_term: row.business_term,
      business_term_description: row.business_term_description,
      version: row.version,
      date_created: row.date_created,
      active: row.active,
      id: row.id
    });
  }

  onUpdate(): void {
    if (this.definitionFormGroup.valid && this.selectedRow) {
      this.definitionFormGroup.value.date_created = formatDate(this.definitionFormGroup.value.date_created, 'yyyy-MM-dd', 'en');

      const updatedData = {
        data: this.definitionFormGroup.value,
        conditions: {
          business_term_id: this.selectedRow.business_term_id
        }
      };
  
      this.businessTermService.updateBo_term(updatedData).subscribe({
        next: () => {
          swalSuccess('Business term updated successfully!');
          this.fetchBusinessTermData(); 
          this.definitionFormGroup.reset();
          this.selectedRow = null;
          // this.generateBusinessTermID();

          this.definitionFormGroup.controls['date_created'].setValue(this.currentDate);


        },
        error: (error) => {
          console.error('Update failed', error);
          swalError('Failed to update the business term.');
        }
      });
    }
  }
  
  isFormValid = true;

  onSubmit() {
    if (this.definitionFormGroup.valid) {
      this.definitionFormGroup.value.date_created = formatDate(this.definitionFormGroup.value.date_created, 'yyyy-MM-dd', 'en');

      this.businessTermService.saveBo_term(this.definitionFormGroup.value).subscribe(
        {
          next: res => {
            console.log(res)
            this.generateBusinessTermID();
            swalSuccess("Successfully saved!");

            this.fetchBusinessTermData();

            // Reset form and generate new Business Term ID
            this.definitionFormGroup.reset();
            this.definitionFormGroup.controls['date_created'].setValue(this.currentDate);
            this.selectedRow = null;

            this.generateBusinessTermID();
          },
          error: err =>   swalError("Something went wrong!")
        }
      );
    } else {
      this.isFormValid = false;
    }
  }

  handleDelete(business_term_id: number) {
    this.businessTermService.deleteBo_term(business_term_id).subscribe({
      next: () => {
        swalSuccess("Business term deleted successfully");
        // Update the table data by removing the deleted item
        this.dataSource.data = this.dataSource.data.filter(item => item.business_term_id !== business_term_id);
      },
      error: (err) => {
        swalError("Failed to delete business term");
        console.error(err);
      }
    });
  }

  onChangePage(event: any) {
    this.pageSize = event.pageSize;
  }

  highlight(index: number, id: string, row: any) {
    console.log('Row highlighted:', row);
  }

  isActive(index: number): boolean {
    return false;
  }

  get FF() : { [key: string]: AbstractControl }{
    return this.definitionFormGroup.controls;
  }
}   