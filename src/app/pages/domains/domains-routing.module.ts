import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDomainsComponent } from './list-domains/list-domains.component';
import { AddDomainComponent } from './add-domain/add-domain.component';
import { DomainDetailComponent } from './domain-detail/domain-detail.component';

const routes: Routes = [
  {path:"" ,component:ListDomainsComponent},
  {path:"new",component:AddDomainComponent},
  {path:"domain/:id" ,component:DomainDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainsRoutingModule { }
