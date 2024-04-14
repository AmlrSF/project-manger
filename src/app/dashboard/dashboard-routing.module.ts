import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  { path : "", component : DashboardLayoutComponent ,children:[
    { path : 'home',    loadChildren :()=>import("../pages/overview/overview.module").then(m=>m.OverviewModule) },
    { path : 'clients', loadChildren : ()=>import("../pages/clients/clients.module").then(m=>m.ClientsModule) },
    { path : 'domains', loadChildren: ()=>import("../pages/domains/domains.module").then(m=>m.DomainsModule) },
    { path : 'settings',loadChildren: ()=>import("../pages/settings/settings.module").then(m=>m.SettingsModule) },
    { path:  'profile',  loadChildren: ()=>import("../pages/profile/profile.module").then(m=>m.ProfileModule) },
    { path:  'parameters', loadChildren: ()=>import("../pages/parameters/parameters.module").then(m=> m.ParametersModule) },
    { path : "", redirectTo: "/admin/home", pathMatch:"full" }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
