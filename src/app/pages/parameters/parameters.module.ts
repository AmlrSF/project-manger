import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { ParametersComponent } from './parameters/parameters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AllComponent } from './all/all.component';
import { AddDbComponent } from './add-db/add-db.component';
import { AddFtpComponent } from './add-ftp/add-ftp.component';
import { AddAdminComponent } from './add-admin/add-admin.component';


@NgModule({
  declarations: [
    ParametersComponent,
    AllComponent,
    AddDbComponent,
    AddFtpComponent,
    AddAdminComponent
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule,
    ReactiveFormsModule
  ]
})
export class ParametersModule { }
