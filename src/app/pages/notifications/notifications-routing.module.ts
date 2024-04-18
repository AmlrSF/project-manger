import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotiifsComponent } from './notiifs/notiifs.component';

const routes: Routes = [
  {path:"", component:NotiifsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
