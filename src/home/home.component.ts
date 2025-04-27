import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: any;
  tableData:any=[]
  constructor(private msalService: MsalService,private commonservice:CommonService) {}

  ngOnInit() {
 
  }




}
