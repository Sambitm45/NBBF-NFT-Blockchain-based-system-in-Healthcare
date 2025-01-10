import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashbaord/dashboard.component';
import {SharedModule} from "../shared/shared.module";
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { RmoComponent } from './rmo/rmo.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientComponent } from './patient/patient.component';
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {InputTextModule} from "primeng/inputtext";
import { UserListTableComponent } from './user-list-table/user-list-table.component';
import {CardModule} from "primeng/card";


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    RmoComponent,
    DoctorComponent,
    PatientComponent,
    UserListTableComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        TableModule,
        TagModule,
        InputTextModule,
        CardModule,
    ]
})
export class AdminModule { }
