import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isDropdownVisible:boolean = false;
  
   constructor(private router: Router) {}
  user = {
    name: 'John Doe',
    profilePicture: 'https://i.pravatar.cc/40'  // dummy profile image
  };


  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);

  }
}
