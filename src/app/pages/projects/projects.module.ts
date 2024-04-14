import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { AddNewComponent } from './add-new/add-new.component';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ListTeamsComponent } from './list-teams/list-teams.component';


@NgModule({
  declarations: [
    AddNewComponent,
    ListProjectsComponent,
    ProjectDetailsComponent,
    ListTeamsComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
