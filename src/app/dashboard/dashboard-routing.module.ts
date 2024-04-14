import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  { path : "", component : DashboardLayoutComponent ,children:[
    { path : 'home',    loadChildren :()=>import("../pages/overview/overview.module").then(m=>m.OverviewModule) },
    { path : 'Projects', loadChildren : ()=>import("../pages/projects/projects.module").then(m=>m.ProjectsModule) },
    { path : 'settings',loadChildren: ()=>import("../pages/settings/settings.module").then(m=>m.SettingsModule) },
    { path:  'profile',  loadChildren: ()=>import("../pages/profile/profile.module").then(m=>m.ProfileModule) },

    { path : "", redirectTo: "/admin/home", pathMatch:"full" }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
