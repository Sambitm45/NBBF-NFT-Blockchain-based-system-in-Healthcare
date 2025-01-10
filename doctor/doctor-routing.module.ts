import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ConsultComponent} from "./consult/consult.component";
import {ViewRecordComponent} from "./view-record/view-record.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {path: 'consult', component: ConsultComponent},
      {path: 'view-records', component: ViewRecordComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule {
}
