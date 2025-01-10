import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PatientRoutingModule} from './patient-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ViewRecordComponent} from './view-record/view-record.component';
import {RecordAccessComponent} from './record-access/record-access.component';
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    DashboardComponent,
    ViewRecordComponent,

    RecordAccessComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
    InputTextModule,
    TableModule,
    TagModule
  ]
})
export class PatientModule {
}
