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
  businessTermCounter = 1; // Counter to generate Business Term ID

  constructor(
    private fb: FormBuilder,
    private businessTermService: BusinessTermService
  ) {
    this.definitionFormGroup = this.fb.group({
      business_term_id: ['', Validators.required],
      business_term: ['', Validators.required],
      business_term_description: ['', Validators.required], // Make description read-only
      version: ['', Validators.required],
      date_created: ['', Validators.required],
      active: ['', Validators.required],
      projectFileName: '',
      projectFilePath: '',
      id: 0
    });
  }

  ngOnInit(): void {
    // this.fetchBusinessTermData();
    this.generateBusinessTermID(); // Generate the Business Term ID
    this.fetchBusinessTermData(); // Fetch business terms for dropdown
  }

  fetchBusinessTermData() {
    this.businessTermService.getBo_term().subscribe({
      next: res => {
        this.dataSource = new MatTableDataSource<any>(res.data);
        // this.dataSource.data = this.dataSource.data;
      },
      error: err => console.error('Error fetching business terms', err)
    });
  }

  fileLocalUrl = '';
  file?: File | null = null;
  uploadFile(event: any) {
    this.fileLocalUrl = URL.createObjectURL(event.target.files[0])
    this.file = event.target.files[0];
    this.FF['projectFileName'].setValue(event.target.files[0].name);
  }

  getUrl(filePath: string) {
    return '';
  }

  lastGeneratedID: string = 'BOT000'; 
  generateBusinessTermID() {

    this.lastGeneratedID = this.dataSource.data.length ? this.dataSource.data[this.dataSource.data.length-1].business_term_id : 'BOT000'
    // Extract the numeric part of the ID from the last generated ID
    const numericID = parseInt(this.lastGeneratedID.replace('BOT', ''), 10) || 0;
  
    // Increment the numeric part and format with leading zeros
    const newIDNumber = numericID + 1;
    this.lastGeneratedID = `BOT${String(newIDNumber).padStart(3, '0')}`;
  
    // Update the form control with the new ID
    this.definitionFormGroup.controls['business_term_id'].setValue(this.lastGeneratedID);
  }

  // Fetch business terms for dropdown
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

  isFormValid = true;

  onSubmit() {
    if (this.definitionFormGroup.valid) {
      this.definitionFormGroup.value.date_created = formatDate(this.definitionFormGroup.value.date_created, 'yyyy-MM-dd', 'en');

      this.selectedRow ? this.updateService() : this.saveService();

    } else {
      this.isFormValid = false;
    }
  }

  saveService() {
    this.businessTermService.saveBo_term(this.definitionFormGroup.value, this.file).subscribe(
      {
        next: res => {
          console.log(res)
          this.generateBusinessTermID();
          swalSuccess("Successfully saved!")
        },
        error: err => swalError("Something went wrong!")
      }
    );
  }

  updateService() {
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

        this.definitionFormGroup.controls['date_created'].setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));


      },
      error: (error) => {
        console.error('Update failed', error);
        swalError('Failed to update the business term.');
      }
    });
  }

  handleDelete(id: string) {
    this.businessTermService.deleteBo_term(Number(id)).subscribe(
      (response) => {
        console.log('Business term deleted', response);
        // this.fetchBusinessTermData();
      },
      (error) => {
        console.error('Error deleting business term', error);
      }
    );
  }

  onChangePage(event: any) {
    this.pageSize = event.pageSize;
  }

  selectedRow: any;
  activeRow: any;
  isActive = (index: number) => { return this.activeRow === index };

  highlight(index: number, id: string, row: any) {
    if (!this.isActive(index)) {
      this.selectedRow = row;
      this.activeRow = index;
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
    else {
      this.activeRow = '';
      this.selectedRow = '';
      this.definitionFormGroup.patchValue({
        business_term_id: '',
        business_term: '',
        business_term_description: '',
        version: '',
        date_created: '',
        active: '',
        id: 0
      });
      this.generateBusinessTermID();
    }
  }

  get FF(): { [key: string]: AbstractControl } {
    return this.definitionFormGroup.controls;
  }
}   