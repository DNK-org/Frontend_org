import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user = {
    name: 'John Doe',
    profilePicture: 'https://i.pravatar.cc/40'  // dummy profile image
  };
}
