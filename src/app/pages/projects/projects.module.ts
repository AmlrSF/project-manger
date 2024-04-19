import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { AddNewComponent } from './add-new/add-new.component';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddNewComponent,
    ListProjectsComponent,
    ProjectDetailsComponent,
   
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProjectsModule { }
