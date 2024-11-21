import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ParticlesConfig } from './particles-config';
import { SignupService } from 'src/app/services/signup.service';
import { AuthService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AssetType, ConfigureDataService, DataOwnerRoles, SensitivityClassification, SensitivityReasonCode } from 'src/app/services/configure-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

declare var particlesJS: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit, AfterViewInit {
  signupError: string = '';
  loginError: string = '';
  emailErrorMessage: string = ''; 
  isModalActive: boolean = false;
  isSignUp: boolean = false;
  isForgetPassword = false;
  openDropdown: string | null = null;
  openNestedDropdown: string | null = null;
  redirectUrl: string | null = null;
  isModalOpen = false;
  currentModal: string | null = null;
  redirectModalType: string | null = null;

  signUpData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  loginData = {
    email: '',
    password: ''
  };
  forgetPasswordData = {
    email: ''
  };

  // Define FormGroups for each modal type
  assetTypeForm: FormGroup;
  sensitivityClassificationForm: FormGroup;
  sensitivityReasonCodeForm: FormGroup;
  dataOwnerRolesForm: FormGroup;

  // Optional: For displaying success/error messages
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  // Data Sources for Mat Tables
    assetTypes: AssetType[] = [];
    sensitivityClassifications: SensitivityClassification[] = [];
    sensitivityReasonCodes: SensitivityReasonCode[] = [];
    dataOwnerRoless: DataOwnerRoles[] = [];
  
    assetTypesDataSource = new MatTableDataSource<AssetType>(this.assetTypes);
    sensitivityClassificationsDataSource = new MatTableDataSource<SensitivityClassification>(this.sensitivityClassifications);
    sensitivityReasonCodesDataSource = new MatTableDataSource<SensitivityReasonCode>(this.sensitivityReasonCodes);
    dataOwnerRolesDataSource = new MatTableDataSource<DataOwnerRoles>(this.dataOwnerRoless);
  
    // Table Columns
    assetTypeColumns: string[] = ['assetTypeCode', 'assetTypeDescription', 'actions'];
    sensitivityClassificationColumns: string[] = ['sensitivityClassification', 'sensitivityClassificationDescription','actions'];
    sensitivityReasonCodeColumns: string[] = ['sensitivityReasonCode', 'sensitivityReasonCodeDescription','actions'];
    dataOwnerRolesColumns: string[] = ['dataOwnerRoles', 'dataOwnerRoleDescription','actions'];
   // ViewChild for Sorting and Pagination
   @ViewChild(MatPaginator) assetTypePaginator!: MatPaginator;
   @ViewChild(MatSort) assetTypeSort!: MatSort;

  @ViewChild('sensitivityClassificationSort') sensitivityClassificationSort!: MatSort;
  @ViewChild('sensitivityClassificationPaginator') sensitivityClassificationPaginator!: MatPaginator;

  @ViewChild('sensitivityReasonCodeSort') sensitivityReasonCodeSort!: MatSort;
  @ViewChild('sensitivityReasonCodePaginator') sensitivityReasonCodePaginator!: MatPaginator;

  @ViewChild('dataOwnerRolesSort') dataOwnerRolesSort!: MatSort;
  @ViewChild('dataOwnerRolesPaginator') dataOwnerRolesPaginator!: MatPaginator;
  // Autocomplete
  selectedElement: any;
  selection = new SelectionModel<any>(false, []); 
  isLoading: boolean = false;
  isEditing = false; 
  isEditMode = false;
  
  // asset types
  filteredAssetTypes!: Observable<AssetType[]>;
  // selectedAssetTypeCode: string | null = null;
  // selectedAssetTypeDescription: string | null = null;
  isNewAssetType: boolean = false;
// sensitivity classifications
  filteredSensitivityClassifications!: Observable<SensitivityClassification[]>;
  // selectedSensitivityClassification: string | null = null;
  isNewSensitivityClassification = false;
// Sensitivity Reason Code
filteredSensitivityReasonCodes!: Observable<SensitivityReasonCode[]>;
// selectedSensitivityReasonCode: string | null = null;
isNewSensitivityReasonCode: boolean = false;
// Data Owner Roles
filteredDataOwnerRoles!: Observable<DataOwnerRoles[]>;
// selectedDataOwnerRoles: string | null = null;
isNewDataOwnerRoles: boolean = false;

  ngOnInit() {
    this.initializeForm();
    // Asset Type Form
    this.assetTypeForm = new FormGroup({
      assetTypeCode: new FormControl(''),
      assetTypeDescription: new FormControl('')
    });
  
    // Sensitivity Classification Form
    this.sensitivityClassificationForm = new FormGroup({
      sensitivityClassification: new FormControl(''),
      sensitivityClassificationDescription: new FormControl('')
    });
  
    // Sensitivity Reason Code Form
    this.sensitivityReasonCodeForm = new FormGroup({
      sensitivityReasonCode: new FormControl(''),
      sensitivityReasonCodeDescription: new FormControl('')
    });
  
    // Data Owner Roles Form
    this.dataOwnerRolesForm = new FormGroup({
      dataOwnerRoles: new FormControl(''),
      dataOwnerRoleDescription: new FormControl('')
    });
  
    this.generateForm();
    particlesJS('particles-js', ParticlesConfig, function() {});
    this.loadInitialData();

    // Asset Type Autocomplete Filtering
    this.filteredAssetTypes = this.assetTypeForm.get('assetTypeCode')!.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        startWith(''),
        map(value => this.filterAssetTypes(value || ''))
      );
  
    // Sensitivity Classification Autocomplete Filtering
    this.filteredSensitivityClassifications = this.sensitivityClassificationForm.get('sensitivityClassification')!.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        startWith(''),
        map(value => this.filterSensitivityClassifications(value || ''))
      );
  
    // Sensitivity Reason Code Autocomplete Filtering
    this.filteredSensitivityReasonCodes = this.sensitivityReasonCodeForm.get('sensitivityReasonCode')!.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        startWith(''),
        map(value => this.filterSensitivityReasonCodes(value || ''))
      );
  
    // Data Owner Roles Autocomplete Filtering
    this.filteredDataOwnerRoles = this.dataOwnerRolesForm.get('dataOwnerRoles')!.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        startWith(''),
        map(value => this.filterDataOwnerRoless(value || ''))
      );
  
    // Listen for changes to Asset Type Code to determine if it's new
    this.assetTypeForm.get('assetTypeCode')!.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.checkIfNewAssetType(value);
      });
  
    // Check if it's a new Sensitivity Classification
    this.sensitivityClassificationForm.get('sensitivityClassification')!.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.checkIfNewSensitivityClassification(value);
      });
  
    // Check if it's a new Sensitivity Reason Code
    this.sensitivityReasonCodeForm.get('sensitivityReasonCode')!.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.checkIfNewSensitivityReasonCode(value);
      });
  
    // Check if it's a new Data Owner Role
    this.dataOwnerRolesForm.get('dataOwnerRoles')!.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.checkIfNewDataOwnerRole(value);
      });
  }

    initializeForm() {
      this.assetTypeForm = this.fb.group({
        assetTypeCode: ['', Validators.required],
        assetTypeDescription: ['', Validators.required]
      });
      this.sensitivityClassificationForm = this.fb.group({
        sensitivityClassification: ['', Validators.required],
        sensitivityClassificationDescription: ['', Validators.required]
      });
    
      this.sensitivityReasonCodeForm = this.fb.group({
        sensitivityReasonCode: ['', Validators.required],
        sensitivityReasonCodeDescription: ['', Validators.required]
      });
    
      this.dataOwnerRolesForm = this.fb.group({
        dataOwnerRoles: ['', Validators.required],
        dataOwnerRoleDescription: ['', Validators.required]
      });
    }
  
    ngAfterViewInit() {
 
      this.assetTypesDataSource.paginator = this.assetTypePaginator;
      this.assetTypesDataSource.sort = this.assetTypeSort;
  
      this.sensitivityClassificationsDataSource.sort = this.sensitivityClassificationSort;
      this.sensitivityClassificationsDataSource.paginator = this.sensitivityClassificationPaginator;
  
      this.sensitivityReasonCodesDataSource.sort = this.sensitivityReasonCodeSort;
      this.sensitivityReasonCodesDataSource.paginator = this.sensitivityReasonCodePaginator;
  
      this.dataOwnerRolesDataSource.sort = this.dataOwnerRolesSort;
      this.dataOwnerRolesDataSource.paginator = this.dataOwnerRolesPaginator;
    }
  
     // Load initial data for all tables
     loadInitialData(): void {
      // Fetch Asset Types
      this.cdService.getAssetTypes().subscribe(
        data => {
          // console.log('Fetched Asset Types:', data); // Debug log
          this.assetTypes = data;
          this.assetTypesDataSource.data = this.assetTypes;
    
          // Optionally, if you have a dropdown, you can update the dropdown here as well
          this.updateAssetTypeDropdown(); // Ensure the dropdown is updated
        },
        error => {
          this.showMessage(error, 'error');
        }
    );

    // Fetch Sensitivity Classifications
    this.cdService.getSensitivityClassifications().subscribe(
      data => {
        // console.log('Fetched Sensitivity Classifications:', data); // Debug log
        this.sensitivityClassifications = data;
        this.sensitivityClassificationsDataSource.data = this.sensitivityClassifications;

        this.updateSensitivityClassificationDropdown();
      },
      error => {
        this.showMessage(error, 'error');
      }
    );

    // Fetch Sensitivity Reason Codes
    this.cdService.getSensitivityReasonCodes().subscribe(
      data => {
        // console.log('Fetched sensitivityReasonCodes :', data);
        this.sensitivityReasonCodes = data;
        this.sensitivityReasonCodesDataSource.data = this.sensitivityReasonCodes;

        this.updateSensitivityReasonCodeDropdown(); 
      },
      error => {
        this.showMessage(error, 'error');
      }
    );

    // Fetch Data Owner Roles
    this.cdService.getDataOwnerRoles().subscribe(
      data => {
        // console.log('Fetched DataOwnerRole:', data);
        this.dataOwnerRoless = data;
        this.dataOwnerRolesDataSource.data = this.dataOwnerRoless;
        
        this.updateDataOwnerRolesDropdown();
      },
      error => {
        this.showMessage(error, 'error');
      }
    );
  }

 // Filter for Asset Types 
 private filterAssetTypes(value: string): AssetType[] {
  const filterValue = value.toLowerCase();
  return this.assetTypes.filter(option => option.assetTypeCode.toLowerCase().includes(filterValue));
}
// Filter for Sensitivity Classification
private filterSensitivityClassifications(value: string): SensitivityClassification[] {
  const filterValue = value.toLowerCase();
  return this.sensitivityClassifications.filter(option =>
    option.sensitivityClassification.toLowerCase().includes(filterValue)
  );
}
// Filter for Sensitivity Reason Code
private filterSensitivityReasonCodes(value: string): SensitivityReasonCode[] {
  const filterValue = value.toLowerCase();
  return this.sensitivityReasonCodes.filter(option =>
    option.sensitivityReasonCode.toLowerCase().includes(filterValue)
  );
}

// Filter for Data Owner Roles
private filterDataOwnerRoless(value: string): DataOwnerRoles[] {
  const filterValue = value.toLowerCase();
  return this.dataOwnerRoless.filter(option =>
    option.dataOwnerRoles.toLowerCase().includes(filterValue)
  );
}


  // Check if the entered Asset Type Code is new or existing
  checkIfNewAssetType(code: string): void {
    const assetControl = this.assetTypeForm.get('assetTypeCode');
    const descriptionControl = this.assetTypeForm.get('assetTypeDescription');
  
    if (!code) {
      descriptionControl!.enable();
      assetControl!.setValidators([Validators.required, this.uniqueAssetTypeCodeValidator()]);
      assetControl!.updateValueAndValidity();
      this.isNewAssetType = true;
      return;
    }
  
    const existingAsset = this.assetTypes.find(asset => asset.assetTypeCode.toLowerCase() === code.toLowerCase());
  
    if (existingAsset) {
      descriptionControl!.setValue(existingAsset.assetTypeDescription);
      descriptionControl!.disable();
      assetControl!.clearValidators();
      assetControl!.setValidators(Validators.required);
      assetControl!.updateValueAndValidity();
      this.isNewAssetType = false;
    } else {
      descriptionControl!.setValue('');
      descriptionControl!.enable();
      assetControl!.setValidators([Validators.required, this.uniqueAssetTypeCodeValidator()]);
      assetControl!.updateValueAndValidity();
      this.isNewAssetType = true;
    }
  }
  
// Check if new Sensitivity Classification
checkIfNewSensitivityClassification(code: string): void {
  // Log the code for debugging purposes
  // console.log('Sensitivity Classification code:', code);

  if (!code || code.trim() === '') {
    // Only trigger warning if code is actually missing or empty
    console.warn('Provided Sensitivity Classification code is null or empty.');
    this.sensitivityClassificationForm.patchValue({
      sensitivityClassificationDescription: '',
    });
    this.sensitivityClassificationForm.get('sensitivityClassificationDescription')!.enable();
    this.isNewSensitivityClassification = true;

    this.sensitivityClassificationForm.get('sensitivityClassification')!.setValidators([Validators.required, this.uniqueSensitivityClassificationCodeValidator()]);
    this.sensitivityClassificationForm.get('sensitivityClassification')!.updateValueAndValidity();
    return;
  }

  const existingClassification = this.sensitivityClassifications.find(classification =>
    classification.sensitivityClassification && classification.sensitivityClassificationDescription?.toLowerCase() === code.toLowerCase()
  );

  if (existingClassification) {
    this.sensitivityClassificationForm.patchValue({
      sensitivityClassificationDescription: existingClassification.sensitivityClassificationDescription,
    });
    this.sensitivityClassificationForm.get('sensitivityClassificationDescription')!.disable();
    this.isNewSensitivityClassification = false;

    this.sensitivityClassificationForm.get('sensitivityClassification')!.clearValidators();
    this.sensitivityClassificationForm.get('sensitivityClassification')!.setValidators(Validators.required);
    this.sensitivityClassificationForm.get('sensitivityClassification')!.updateValueAndValidity();
  } else {
    this.sensitivityClassificationForm.patchValue({
      sensitivityClassificationDescription: '',
    });
    this.sensitivityClassificationForm.get('sensitivityClassificationDescription')!.enable();
    this.isNewSensitivityClassification = true;

    this.sensitivityClassificationForm.get('sensitivityClassification')!.setValidators([Validators.required, this.uniqueSensitivityClassificationCodeValidator()]);
    this.sensitivityClassificationForm.get('sensitivityClassification')!.updateValueAndValidity();
  }
}


// Check if new Sensitivity Reason Code
private checkIfNewSensitivityReasonCode(code: string): void {
  if (!code) {
    console.warn('Provided Sensitivity Reason Code is null or empty.');
    this.sensitivityReasonCodeForm.patchValue({
      sensitivityReasonCodeDescription: '',
    });
    this.sensitivityReasonCodeForm.get('sensitivityReasonCodeDescription')!.enable();
    this.isNewSensitivityReasonCode = true;

    this.sensitivityReasonCodeForm.get('sensitivityReasonCode')!.setValidators([Validators.required, this.uniqueSensitivityReasonCodeValidator()]);
    this.sensitivityReasonCodeForm.get('sensitivityReasonCode')!.updateValueAndValidity();
    return;
  }

  const existingReasonCode = this.sensitivityReasonCodes.find(reasonCode =>
    reasonCode.sensitivityReasonCode && reasonCode.sensitivityReasonCodeDescription.toLowerCase() === code.toLowerCase()
  );

  if (existingReasonCode) {
    this.sensitivityReasonCodeForm.patchValue({
      sensitivityReasonCodeDescription: existingReasonCode.sensitivityReasonCodeDescription,
    });
    this.sensitivityReasonCodeForm.get('sensitivityReasonCodeDescription')!.disable();
    this.isNewSensitivityReasonCode = false;

    this.sensitivityReasonCodeForm.get('sensitivityReasonCode')!.clearValidators();
    this.sensitivityReasonCodeForm.get('sensitivityReasonCode')!.setValidators(Validators.required);
    this.sensitivityReasonCodeForm.get('sensitivityReasonCode')!.updateValueAndValidity();
  } else {
    this.sensitivityReasonCodeForm.patchValue({
      sensitivityReasonCodeDescription: '',
    });
    this.sensitivityReasonCodeForm.get('sensitivityReasonCodeDescription')!.enable();
    this.isNewSensitivityReasonCode = true;

    this.sensitivityReasonCodeForm.get('sensitivityReasonCode')!.setValidators([Validators.required, this.uniqueSensitivityReasonCodeValidator()]);
    this.sensitivityReasonCodeForm.get('sensitivityReasonCode')!.updateValueAndValidity();
  }
}

// Check if new Data Owner Role
private checkIfNewDataOwnerRole(code: string): void {
  if (!code) {
    console.warn('Provided Data Owner Role code is null or empty.');
    this.dataOwnerRolesForm.patchValue({
      dataOwnerRoleDescription: '',
    });
    this.dataOwnerRolesForm.get('dataOwnerRoleDescription')!.enable();
    this.isNewDataOwnerRoles = true;

    this.dataOwnerRolesForm.get('dataOwnerRoles')!.setValidators([Validators.required, this.uniqueDataOwnerRoleCodeValidator()]);
    this.dataOwnerRolesForm.get('dataOwnerRoles')!.updateValueAndValidity();
    return;
  }

  const existingRole = this.dataOwnerRoless.find(role =>
    role.dataOwnerRoles && role.dataOwnerRoleDescription .toLowerCase() === code.toLowerCase()
  );

  if (existingRole) {
    this.dataOwnerRolesForm.patchValue({
      dataOwnerRoleDescription: existingRole.dataOwnerRoleDescription,
    });
    this.dataOwnerRolesForm.get('dataOwnerRoleDescription')!.disable();
    this.isNewDataOwnerRoles = false;

    this.dataOwnerRolesForm.get('dataOwnerRoles')!.clearValidators();
    this.dataOwnerRolesForm.get('dataOwnerRoles')!.setValidators(Validators.required);
    this.dataOwnerRolesForm.get('dataOwnerRoles')!.updateValueAndValidity();
  } else {
    this.dataOwnerRolesForm.patchValue({
      dataOwnerRoleDescription: '',
    });
    this.dataOwnerRolesForm.get('dataOwnerRoleDescription')!.enable();
    this.isNewDataOwnerRoles = true;

    this.dataOwnerRolesForm.get('dataOwnerRoles')!.setValidators([Validators.required, this.uniqueDataOwnerRoleCodeValidator()]);
    this.dataOwnerRolesForm.get('dataOwnerRoles')!.updateValueAndValidity();
  }
}
  // Handle selection from Autocomplete
  onAssetTypeSelected(selectedCode: string): void {
    this.checkIfNewAssetType(selectedCode);
    }
  onSensitivityClassificationSelected(selectedCode: string): void {
    this.checkIfNewSensitivityClassification(selectedCode);
    }
  onSensitivityReasonCodeSelected(selectedCode: string): void {
    this.checkIfNewSensitivityReasonCode(selectedCode);
    }
  onDataOwnerRoleSelected(selectedCode: string): void {
    this.checkIfNewDataOwnerRole(selectedCode);
    }

  openModal(modalType: string): void {
    this.isModalOpen = true;
    this.currentModal = modalType;
    this.openDropdown = null;
    this.openNestedDropdown = null;
    this.message = '';
    this.messageType = '';
    switch (modalType) {
      case 'assetType':
        this.loadAssetTypeData();
        this.resetForm('assetType');
        break;
      case 'sensitivityClassification':
        this.loadSensitivityClassificationData();
        this.resetForm('sensitivityClassification');
        break;
      case 'sensitivityReasonCode':
        this.loadSensitivityReasonCodeData();
        this.resetForm('sensitivityReasonCode');
        break;
      case 'dataOwnerRoles':
        this.loadDataOwnerRolesData();
        this.resetForm('dataOwnerRole');
        break;
      default:
        console.warn(`Unknown modal type: ${modalType}`);
        break;
    }}

    loadAssetTypeData() {
      this.cdService.getAssetTypes().subscribe((data: AssetType[]) => {
        this.assetTypes = data;
        this.assetTypesDataSource.data = this.assetTypes;
    
        // Update the dropdown or filteredAssetTypes based on the data.
        this.filteredAssetTypes = this.assetTypeForm.controls['assetTypeCode'].valueChanges.pipe(
          startWith(''),
          map(value => this.filterAssetTypes(value))
        );
      });
    }
   
    loadSensitivityClassificationData() {
      this.cdService.getSensitivityClassifications().subscribe((data: SensitivityClassification[]) => {
        this.sensitivityClassifications = data;
        this.sensitivityClassificationsDataSource.data = this.sensitivityClassifications;
    
  
        this.filteredSensitivityClassifications = this.sensitivityClassificationForm.controls['sensitivityClassification'].valueChanges.pipe(
          startWith(''),
          map(value => this.filterSensitivityClassifications(value))
        );
      });
    }
    loadSensitivityReasonCodeData() {
      this.cdService.getSensitivityReasonCodes().subscribe((data: SensitivityReasonCode[]) => {
        this.sensitivityReasonCodes = data;
        this.sensitivityReasonCodesDataSource.data = this.sensitivityReasonCodes;
    
  
        this.filteredSensitivityReasonCodes = this.sensitivityReasonCodeForm.controls['sensitivityReasonCode'].valueChanges.pipe(
          startWith(''),
          map(value => this.filterSensitivityReasonCodes(value))
        );
      });
    }
    loadDataOwnerRolesData() {
      this.cdService.getDataOwnerRoles().subscribe((data: DataOwnerRoles[]) => {
        this.dataOwnerRoless = data;
        this.dataOwnerRolesDataSource.data = this.dataOwnerRoless;
    
  
        this.filteredDataOwnerRoles = this.dataOwnerRolesForm.controls['dataOwnerRoles'].valueChanges.pipe(
          startWith(''),
          map(value => this.filterDataOwnerRoless(value))
        );
      });
    }
   
    onPageChange(event: PageEvent) {
      // Handle page change if you need to perform any additional logic
      // console.log('Page changed:', event);
    }
 toggleDropdown(dropdown: string) {
    if (this.openDropdown === dropdown) {
      this.openDropdown = null;
    } else {
      this.openDropdown = dropdown;
    }
    this.openNestedDropdown = null;

  }

  toggleNestedDropdown(nestedDropdown: string) {
    if (this.openNestedDropdown === nestedDropdown) {
      this.openNestedDropdown = null;
    } else {
      this.openNestedDropdown = nestedDropdown;
    }
  }
    // Detect clicks outside the dropdown to close it
    @HostListener('document:click', ['$event'])
    clickOutside(event: Event) {
      const targetElement = event.target as HTMLElement;
  
      // If clicked element is not inside the dropdown, close the dropdown
      if (!targetElement.closest('.link-with-menu')) {
        this.openDropdown = null;
        this.openNestedDropdown = null;
      }
    }
     // Handle page refresh to clear login token
  @HostListener('window:beforeunload', ['$event'])
  clearTokenOnRefresh(event: Event) {
    this.loginService.clearTokenOnRefresh(); // Clear token on refresh
  }

    onDropdownClick(event: MouseEvent) {
      event.stopPropagation();
    }
    constructor(
      private fb: FormBuilder,
      private signupService: SignupService,
      private loginService: AuthService,
      private router: Router,
      private cdService: ConfigureDataService,
      private cdr: ChangeDetectorRef
    ) {
      // Initialize forms
      this.assetTypeForm = this.fb.group({
        assetTypeCode: ['', [Validators.required, this.uniqueAssetTypeCodeValidator()]],
        assetTypeDescription: [{ value: '', disabled: true }, Validators.required]
      });
    
      this.sensitivityClassificationForm = this.fb.group({
        sensitivityClassification: ['', [Validators.required, this.uniqueSensitivityClassificationCodeValidator()]],
        sensitivityClassificationDescription: [{ value: '', disabled: true }, Validators.required]
      });
    
      this.sensitivityReasonCodeForm = this.fb.group({
        sensitivityReasonCode: ['', [Validators.required, this.uniqueSensitivityReasonCodeValidator()]],
        sensitivityReasonCodeDescription:  [{ value: '', disabled: true }, Validators.required]
      });
    
      this.dataOwnerRolesForm = this.fb.group({
        dataOwnerRoles: ['', [Validators.required, this.uniqueDataOwnerRoleCodeValidator()]],
        dataOwnerRoleDescription:  [{ value: '', disabled: true }, Validators.required]
      });
    }
    

  formGroup!: FormGroup;

  generateForm() {
    this.formGroup = this.fb.group({
      id: 0,
      name: '',
      surname: '',
      email: '',
      description: '',

    })
  }

  UpdateData: any;

  get FF(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  isFormValid = true;

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const nav = document.querySelector('nav') as HTMLElement;
    if (nav) {
      if (window.scrollY > 0) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  }

  openLoginModal() {
    this.isModalActive = true;
    this.isSignUp = false;
    this.isForgetPassword = false; 
    
    // Close all dropdowns
    this.openDropdown = null;
    this.openNestedDropdown = null;
  }
  
  openSignupModal() {
    this.isModalActive = true;
    this.isSignUp = true;
    this.isForgetPassword = false;

        // Close all dropdowns
        this.openDropdown = null;
        this.openNestedDropdown = null;
  }

  // Handle login form submission
  onLogin(form: NgForm) {
    this.loginError = '';
    if (form.valid) {
      const { email, password } = form.value;

      this.loginService.login(email, password).subscribe((isAuthenticated: boolean) => {
        if (isAuthenticated) {

          this.closeModal(form); 

          // Display SweetAlert2 success message centered
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login successful!',
          showConfirmButton: false,
          timer: 2000
        });

           // Open the modal saved before login
        if (this.redirectModalType) {
          this.openModal(this.redirectModalType);
          this.redirectModalType = null; // Clear after opening
        }

        // Navigate to the redirect URL if set
        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);
          this.redirectUrl = null; // Reset after navigation
        } else {
          // Optionally navigate to a default page
          // this.router.navigate(['/default-page']);
        }
        
      } else {
        this.loginError = 'Invalid credentials, please try again.';
      }
    },
    (error) => {
      console.error('Error occurred during login:', error);
      if (error.status === 401 || error.status === 400) {
        this.loginError = 'Invalid credentials, please try again.';
      } else {
        this.loginError = 'An error occurred during login. Please try again later.';
      }
    }
  );
} else {
  // Optionally, mark all fields as touched to trigger validation messages
  form.form.markAllAsTouched();
  // console.log('Login form is invalid');
}
}

  // for bod authentication 
  onBusinessObjectClick() {
    if (!this.loginService.isLoggedIn()) {
      this.redirectUrl = '/pages/business';
      // Open the login modal
      this.openLoginModal();
    } else {
      this.router.navigate(['/pages/business']);
    }
  }
  onBusinessStructureClick(){
    if (!this.loginService.isLoggedIn()) {
      this.redirectUrl = '/pages/structure';
      // Open the login modal
      this.openLoginModal();
    } else {
      this.router.navigate(['/pages/structure']);
    }
  }
    onBusinessTermClick(){
      if (!this.loginService.isLoggedIn()) {
        this.redirectUrl = '/pages/businessTerm';
        // Open the login modal
        this.openLoginModal();
      } else {
        this.router.navigate(['/pages/businessTerm']);
      }
}
onConfigureDataClick(modalType: string) {
  if (!this.loginService.isLoggedIn()) {
    this.redirectModalType  = modalType;
    this.openLoginModal();
    } else {
    this.openModal(modalType); 
  }
  // this.openModal(modalType); 

}
  onForgetPasswordSubmit(email: string) {
    if (!email) {
      alert('Please enter a valid email.');
      return;
    }
    // Handle forget password logic
    // console.log("Forgot Password for:", email);
    // You can integrate a service to handle password reset here
    alert('Password reset link has been sent to your email.');
    this.showLogin();
  }

  // Toggle between Login and Sign-Up forms
  toggleSignUp(showSignUp: boolean) {
    this.isSignUp = showSignUp;
    this.isForgetPassword = false; 
  }

  // Show Forget Password form
  showForgetPassword() {
    this.isForgetPassword = true;
    this.isSignUp = false; 
  }

  // Show Login form (from Forget Password)
  showLogin() {
    this.isForgetPassword = false;
    this.isSignUp = false; 
  }
  closeModal(form?: NgForm): void {
    this.isModalActive = false;
    this.isForgetPassword = false;
    this.isSignUp = false; 
    this.signupError = '';
    this.emailErrorMessage = '';
    this.loginError ='';
    this.isModalOpen = false; 
    this.currentModal = null;
    if (form) {
      form.resetForm(); // Reset the form fields
    }
    this.loginData = {
      email: '',
      password: ''
    };  
  }
  onSignUp(form: NgForm): void {
    if (!form.valid || this.signUpData.password !== this.signUpData.confirmPassword) {
      return;
    }
    // Reset previous error messages
    this.signupError = '';
    this.emailErrorMessage = '';

    if (form.valid) {
      this.signupService.signup(this.signUpData).subscribe(
        (response) => {
          // console.log('Signup successful:', response);
          this.signupError = ''; 
          this.closeModal(form);

        // Display SweetAlert2 success message
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Signup successful!",
          showConfirmButton: false,
          timer: 2000
        });

        },
        (error) => {
          console.error('Error during signup:', error);
          if (error.status === 400 && error.error?.error) {
            if (error.error.error === 'Email already registered') {
              this.signupError = 'Email is already registered.';
            } else if (error.error.error === "Enter a valid email. Check for typos and make sure the format is example@xyz.com.") {
              this.emailErrorMessage = "Enter a valid email. Check for typos and make sure the format is example@xyz.com.";
            } else if (error.error.error === 'Password must be at least 6 characters') {
                this.signupError = 'Password must be at least 6 characters.';
            }else {
              this.signupError = 'An error occurred during signup. Please try again later.';
            }
          }
        }
      );
    } else {
      // Optionally, mark all fields as touched to trigger validation messages
      form.form.markAllAsTouched();
      // console.log('Sign up form is invalid');
    }
  }
  // Reset form based on modal asset type
 // Reset form based on modal
resetForm(entityType: string) {
  // Reset Asset Type Form
  this.assetTypeForm.reset();
  this.isEditing = false; 
  this.sensitivityClassificationForm.reset();
  this.sensitivityReasonCodeForm.reset();
  this.dataOwnerRolesForm.reset();
}
onSaveOrUpdateAssetType() {
  const assetType: AssetType = {
    assetTypeCode: this.assetTypeForm.get('assetTypeCode')!.value,
    assetTypeDescription: this.assetTypeForm.get('assetTypeDescription')!.value 
  };

  const saveOrUpdate$ = this.isEditMode
    ? this.cdService.updateAssetType(assetType, this.selectedElement.assetTypeCode)
    : this.cdService.saveAssetType(assetType);

  saveOrUpdate$.subscribe(
    () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: this.isEditMode ? 'Updated successfully!' : 'Saved successfully!',
        showConfirmButton: false,
        timer: 1500
      });

      // Reset form and state
      this.assetTypeForm.reset();
      this.isEditMode = false;      
      this.selectedElement = null;
      this.loadInitialData();  
      this.updateAssetTypeDropdown();
      // this.getAssetTypes();
    },
    (error) => {
      const message = error.status === 409 ? 'Duplicate Asset Type Code' : 'Something went wrong';
      Swal.fire({ icon: 'error', title: message, confirmButtonText: 'OK' });
    }
  );
}
updateAssetTypeDropdown() {
  this.cdService.getAssetTypes().subscribe((assetTypes) => {
    this.filteredAssetTypes = this.assetTypeForm.get('assetTypeCode')!.valueChanges.pipe(
      startWith(''),
      map(value => assetTypes.filter(option => option.assetTypeCode.toLowerCase().includes(value.toLowerCase())))
    );
  });
}
updateSensitivityClassificationDropdown(){
  this.cdService.getSensitivityClassifications().subscribe((sensitivityClassifications) => {
    this.filteredSensitivityClassifications = this.sensitivityClassificationForm.get('sensitivityClassification')!.valueChanges.pipe(
      startWith(''),
      map(value => sensitivityClassifications.filter(option => option.sensitivityClassification.toLowerCase().includes(value.toLowerCase())))
    );
  });
}
updateSensitivityReasonCodeDropdown(){
  this.cdService.getSensitivityClassifications().subscribe((sensitivityClassifications) => {
    this.filteredSensitivityReasonCodes = this.sensitivityReasonCodeForm.get('sensitivityReasonCode')!.valueChanges.pipe(
      startWith(''),
      map(value => this.sensitivityReasonCodes.filter(option => option.sensitivityReasonCode.toLowerCase().includes(value.toLowerCase())))
    );
  });
}
updateDataOwnerRolesDropdown() {
  this.cdService.getDataOwnerRoles().subscribe((dataOwnerRoless) => {
    this.filteredDataOwnerRoles = this.dataOwnerRolesForm.get('dataOwnerRoles')!.valueChanges.pipe(
      startWith(''),
      map(value => dataOwnerRoless.filter(option => option.dataOwnerRoles.toLowerCase().includes(value.toLowerCase())))
    );
  });
}
  onSaveOrUpdateSensitivityClassification() {
    const sensitivityClassification: SensitivityClassification = {
      sensitivityClassification: this.sensitivityClassificationForm.get('sensitivityClassification')!.value,
      sensitivityClassificationDescription: this.sensitivityClassificationForm.get('sensitivityClassificationDescription')!.value
    };
  
    const saveOrUpdate$ = this.isEditMode
    ? this.cdService.updateSensitivityClassification(sensitivityClassification, this.selectedElement.sensitivityClassification)
    : this.cdService.saveSensitivityClassification(sensitivityClassification);

  saveOrUpdate$.subscribe(
    () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: this.isEditMode ? 'Updated successfully!' : 'Saved successfully!',
        showConfirmButton: false,
        timer: 1500
      });

      // Reset form and state
      this.sensitivityClassificationForm.reset();
      this.isEditMode = false;      
      this.selectedElement = null;
      this.loadInitialData();
      this.updateSensitivityClassificationDropdown();  
    },
    (error) => {
      const message = error.status === 409 ? 'Duplicate Sensitivity Classification' : 'Something went wrong';
      Swal.fire({ icon: 'error', title: message, confirmButtonText: 'OK' });
    }
  );
}
  onSaveOrUpdateSensitivityReasonCode() {
    const sensitivityReasonCode: SensitivityReasonCode = {
      sensitivityReasonCode: this.sensitivityReasonCodeForm.get('sensitivityReasonCode')!.value,
      sensitivityReasonCodeDescription: this.sensitivityReasonCodeForm.get('sensitivityReasonCodeDescription')!.value
    };
  
    const saveOrUpdate$ = this.isEditMode
    ? this.cdService.updateSensitivityReasonCode(sensitivityReasonCode, this.selectedElement.sensitivityReasonCode)
    : this.cdService.saveSensitivityReasonCode(sensitivityReasonCode);

  saveOrUpdate$.subscribe(
    () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: this.isEditMode ? 'Updated successfully!' : 'Saved successfully!',
        showConfirmButton: false,
        timer: 1500
      });

      // Reset form and state
      this.sensitivityReasonCodeForm.reset();
      this.isEditMode = false;      
      this.selectedElement = null;
      this.loadInitialData();  
      this.updateSensitivityReasonCodeDropdown();
    },
    (error) => {
      const message = error.status === 409 ? 'Duplicate Sensitivity Reason Code' : 'Something went wrong';
      Swal.fire({ icon: 'error', title: message, confirmButtonText: 'OK' });
    }
  );
}
  onSaveOrUpdateDataOwnerRoles() {
    const dataOwnerRoles: DataOwnerRoles = {
      dataOwnerRoles: this.dataOwnerRolesForm.get('dataOwnerRoles')!.value,
      dataOwnerRoleDescription: this.dataOwnerRolesForm.get('dataOwnerRoleDescription')!.value
    };
  
    const saveOrUpdate$ = this.isEditMode
    ? this.cdService.updateDataOwnerRoles(dataOwnerRoles, this.selectedElement.dataOwnerRoles)
    : this.cdService.saveDataOwnerRoles(dataOwnerRoles);

  saveOrUpdate$.subscribe(
    () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: this.isEditMode ? 'Updated successfully!' : 'Saved successfully!',
        showConfirmButton: false,
        timer: 1500
      });

      // Reset form and state
      this.dataOwnerRolesForm.reset();
      this.isEditMode = false;      
      this.selectedElement = null;
      this.loadInitialData();  
      this.updateDataOwnerRolesDropdown();
    },
    (error) => {
      const message = error.status === 409 ? 'Duplicate Data Owner Roles' : 'Something went wrong';
      Swal.fire({ icon: 'error', title: message, confirmButtonText: 'OK' });
    }
  );
}
  onDeleteAssetType(assetTypeCode: string) {
    if (!assetTypeCode) {
        console.error('Asset type code is undefined');
        return;
    }

    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this asset type?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            this.cdService.deleteAssetType(assetTypeCode).subscribe({
                next: () => {
                    // Remove the deleted asset type from the assetTypes array
                    this.assetTypes = this.assetTypes.filter(asset => asset.assetTypeCode !== assetTypeCode);

                    // Update the table data source with the filtered array
                    this.assetTypesDataSource.data = this.assetTypes;

                    // Optionally reset the form and exit edit mode
                    this.resetForm('assetType');
                    this.isEditMode = false;

                    // Show a success alert
                    Swal.fire({ title: 'Deleted!', text: 'Asset type has been deleted.', icon: 'success', showConfirmButton: false, timer: 1500 });
                    
                    // Refresh the table and the asset type dropdown
                    this.refreshTable('assetType');
                    this.updateAssetTypeDropdown(); // Call this to update dropdown options
                },
                error: (err) => {
                    console.error('Delete failed', err);
                    Swal.fire('Error', 'There was an error deleting the asset type.', 'error');
                }
            });
        }
    });
}


  onDeleteSensitivityClassification(sensitivityClassification: string) {
    if (!sensitivityClassification) {
      console.error('Sensitivity classification code is undefined');
      return;
    }
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this sensitivity classification?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cdService.deleteSensitivityClassification(sensitivityClassification).subscribe({
          next: () => {
            
            this.sensitivityClassifications = this.sensitivityClassifications.filter(classification => classification.sensitivityClassification !== sensitivityClassification);

            this.sensitivityClassificationsDataSource.data = this.sensitivityClassifications;

            // Optionally reset the form and exit edit mode
            this.resetForm('sensitivityClassification');
            this.isEditMode = false;

            // Show a success alert
            Swal.fire({ title: 'Deleted!', text: 'Sensitivity Classification has been deleted.', icon: 'success', showConfirmButton: false, timer: 1500 });
            
            // Refresh the table and the asset type dropdown
            this.refreshTable('sensitivityClassification');
            this.updateSensitivityClassificationDropdown();   
                 },
        error: (err) => {
            console.error('Delete failed', err);
            Swal.fire('Error', 'There was an error deleting the sensitivity classification.', 'error');
        }
    });
}
});
}

  onDeleteSensitivityReasonCode(sensitivityReasonCode: string) {
    if (!sensitivityReasonCode) {
      console.error('Sensitivity reason code is undefined');
      return;
    }
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this sensitivity reason code?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cdService.deleteSensitivityReasonCode(sensitivityReasonCode).subscribe({
          next: () => {
            
            this.sensitivityReasonCodes = this.sensitivityReasonCodes.filter( reasonCode=> reasonCode.sensitivityReasonCode !== sensitivityReasonCode);
            this.sensitivityReasonCodesDataSource.data = this.sensitivityReasonCodes;
            this.resetForm('sensitivityReasonCode');
            this.isEditMode = false;

            // Show a success alert
            Swal.fire({ title: 'Deleted!', text: 'Sensitivity Reason Code has been deleted.', icon: 'success', showConfirmButton: false, timer: 1500 });
            
            this.refreshTable('sensitivityReasonCode');
            this.updateSensitivityReasonCodeDropdown();
          },
        error: (err) => {
            console.error('Delete failed', err);
            Swal.fire('Error', 'There was an error deleting the sensitivity reason code.', 'error');
        }
    });
}
});
}

  onDeleteDataOwnerRoles(dataOwnerRoles: string) {
    if (!dataOwnerRoles) {
      console.error('Data owner role code is undefined');
      return;
    }
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this data owner role?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cdService.deleteDataOwnerRoles(dataOwnerRoles).subscribe({
          next: () => {
            this.dataOwnerRoless = this.dataOwnerRoless.filter(role => role.dataOwnerRoles !== dataOwnerRoles);
            this.dataOwnerRolesDataSource.data = this.dataOwnerRoless;
            this.resetForm('dataOwnerRoles');
            this.isEditMode = false;

            // Show a success alert
            Swal.fire({ title: 'Deleted!', text: 'Data Owner Roles has been deleted.', icon: 'success', showConfirmButton: false, timer: 1500 });            
            this.refreshTable('dataOwnerRoles');
            this.updateDataOwnerRolesDropdown(); 
        },
        error: (err) => {
            console.error('Delete failed', err);
            Swal.fire('Error', 'There was an error deleting the data owner roles.', 'error');
        }
    });
}
});
}
  

  
  
  refreshTable(entityType: 'assetType' | 'sensitivityClassification' | 'sensitivityReasonCode' | 'dataOwnerRoles') {
    let serviceMethod: Observable<any>;
    let dataSource: { data: any[] }; 
  
    switch (entityType) {
      case 'assetType':
        serviceMethod = this.cdService.getAssetTypes();
        dataSource = this.assetTypesDataSource; 
        break;
      case 'sensitivityClassification':
        serviceMethod = this.cdService.getSensitivityClassifications();
        dataSource = this.sensitivityClassificationsDataSource; 
        break;
      case 'sensitivityReasonCode':
        serviceMethod = this.cdService.getSensitivityReasonCodes();
        dataSource = this.sensitivityReasonCodesDataSource; 
        break;
      case 'dataOwnerRoles':
        serviceMethod = this.cdService.getDataOwnerRoles();
        dataSource = this.dataOwnerRolesDataSource; 
        break;
    }
  
    serviceMethod.subscribe(
      (data: any[]) => { 
        dataSource.data = data; 
      },
      (error: any) => { 
        console.error(`Error fetching ${entityType}: `, error);
      }
    );
  }
  
  onAddNew(entityType: 'assetType' | 'sensitivityClassification' | 'sensitivityReasonCode' | 'dataOwnerRoles') {
    this.resetForm(entityType); // Clear the form and reset the flag to "create" mode
  }
  
 // Select or Deselect the Row
selectRow(row: any, entityType: 'assetType' | 'sensitivityClassification' | 'sensitivityReasonCode' | 'dataOwnerRoles') {
  if (this.selectedElement === row) {
    this.selectedElement = null;
    this.resetForm(entityType); // Optionally reset the form
    this.isEditMode = false; // Exit edit mode if necessary
  } else {
    // Select the row and populate the form for editing
    this.selectedElement = row;
    switch (entityType) {
      case 'assetType':
        this.assetTypeForm.patchValue({
          assetTypeCode: row.assetTypeCode,
          assetTypeDescription: row.assetTypeDescription
        });
        this.isEditMode = true;
        this.assetTypeForm.get('assetTypeDescription')!.enable();
        this.updateAssetTypeDropdown();

        break;
      case 'sensitivityClassification':
        this.sensitivityClassificationForm.patchValue({
          sensitivityClassification: row.sensitivityClassification,
          sensitivityClassificationDescription: row.sensitivityClassificationDescription
        });
        this.isEditMode = true;
        this.sensitivityClassificationForm.get('sensitivityClassificationDescription')!.enable();
        this.updateSensitivityClassificationDropdown();
        break;
      case 'sensitivityReasonCode':
        this.sensitivityReasonCodeForm.patchValue({
          sensitivityReasonCode: row.sensitivityReasonCode,
          sensitivityReasonCodeDescription: row.sensitivityReasonCodeDescription
        });
        this.isEditMode = true;
        this.sensitivityReasonCodeForm.get('sensitivityReasonCodeDescription')!.enable();
        this.updateSensitivityReasonCodeDropdown();
        break;
      case 'dataOwnerRoles':
        this.dataOwnerRolesForm.patchValue({
          dataOwnerRoles: row.dataOwnerRoles,
          dataOwnerRoleDescription: row.dataOwnerRoleDescription
        });
        this.isEditMode = true;
        this.dataOwnerRolesForm.get('dataOwnerRoleDescription')!.enable();
        this.updateDataOwnerRolesDropdown()
        break;
    }
  }
}

  
     // Custom Validator to ensure Asset Type Code uniqueness
  uniqueAssetTypeCodeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const code = control.value;
      if (!code) return null; 
      const exists = this.assetTypes.some(asset => asset.assetTypeCode.toLowerCase() === code.toLowerCase());
      return exists ? { 'unique': { value: control.value } } : null;
    };
  }
// Custom Validator to ensure Sensitivity Classification Code uniqueness
uniqueSensitivityClassificationCodeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const code = control.value;
    if (!code) return null;
    const exists = this.sensitivityClassifications.some(classification => 
      classification.sensitivityClassification.toLowerCase() === code.toLowerCase()
    );
    return exists ? { 'unique': { value: control.value } } : null;
  };
}
// Custom Validator to ensure Sensitivity Reason Code uniqueness
uniqueSensitivityReasonCodeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const code = control.value;
    if (!code) return null;
    const exists = this.sensitivityReasonCodes.some(reasonCode => 
      reasonCode.sensitivityReasonCode.toLowerCase() === code.toLowerCase()
    );
    return exists ? { 'unique': { value: control.value } } : null;
  };
}
// Custom Validator to ensure Data Owner Role Code uniqueness
uniqueDataOwnerRoleCodeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const code = control.value;
    if (!code) return null;
    const exists = this.dataOwnerRoless.some(role => 
      role.dataOwnerRoles.toLowerCase() === code.toLowerCase()
    );
    return exists ? { 'unique': { value: control.value } } : null;
  };
}

  showMessage(message: string, type: 'success' | 'error'): void {
    Swal.fire({
      position: 'center',
      icon: type === 'success' ? 'success' : 'error',
      title: type === 'success' ? message : 'Error: ' + message,
      showConfirmButton: true,
      timer: type === 'success' ? 2000 : undefined,
    });
  }
}