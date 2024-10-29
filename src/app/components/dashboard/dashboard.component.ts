import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  title = 'SPA_application';

  isOpenSide = true;
  
  handleSideOpenClose(){
    this.isOpenSide ? document.getElementById('sidebar')?.classList.remove('close-sidebar') : document.getElementById('sidebar')?.classList.add('close-sidebar')
    this.isOpenSide = !this.isOpenSide;
  }
  
  openMenu(name: string){
    localStorage.setItem('menuName', name)
  }
}
