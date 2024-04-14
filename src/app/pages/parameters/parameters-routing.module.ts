import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ParametersComponent } from './parameters/parameters.component';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { AddDbComponent } from './add-db/add-db.component';
import { AddFtpComponent } from './add-ftp/add-ftp.component';
import { AddAdminComponent } from './add-admin/add-admin.component';

const routes: Routes = [ 
  { path: "all", component:ParametersComponent },
  { path: "add-db", component:AddDbComponent },
  { path: "add-FTPclient", component:AddFtpComponent },
  { path: "add-Admin", component:AddAdminComponent },
  { path : "", redirectTo:"/all" , pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { 

}
