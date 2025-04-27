import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: CommonService, private router: Router) {}

  login() {
    
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        debugger
        localStorage.setItem('token', res.token);
        localStorage.setItem('refreshToken', res.refreshToken);

        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert('Invalid credentials');
      }
    });
  }
}
