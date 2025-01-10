import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ViewRecordComponent} from "./view-record/view-record.component";
import {RecordAccessComponent} from "./record-access/record-access.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {path: 'view-record', component: ViewRecordComponent},
      {path: 'record-access', component: RecordAccessComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule {
}
