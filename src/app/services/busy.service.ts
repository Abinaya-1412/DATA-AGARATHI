import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyRequestCount = 0;

  constructor(private readonly spinnerService: NgxSpinnerService) { }

  busy() { 
    this.spinnerService.show(); 
  }

  hide() {
    this.spinnerService.hide();
  }

}
