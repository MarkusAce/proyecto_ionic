import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarmarcaPage } from './editarmarca.page';

const routes: Routes = [
  {
    path: '',
    component: EditarmarcaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarmarcaPageRoutingModule {}
