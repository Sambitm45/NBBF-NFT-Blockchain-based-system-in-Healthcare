import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashbaord/dashboard.component";
import {DashboardHomeComponent} from "./dashboard-home/dashboard-home.component";
import {RmoComponent} from "./rmo/rmo.component";
import {DoctorComponent} from "./doctor/doctor.component";
import {PatientComponent} from "./patient/patient.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {path: 'dashboard', component: DashboardHomeComponent},
      {path: 'rmo', component: RmoComponent},
      {path: 'doctor', component: DoctorComponent},
      {path: 'patient', component: PatientComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
