import {Component, OnInit, ViewChild} from '@angular/core';
import {PatientService} from "../services/patient.service";
import {UserType} from "../../types/user.type";
import {ProgressCardComponent} from "../../shared/progress-card/progress-card.component";

interface DocWithAccessType {
  doc: UserType,
  access: boolean
}

@Component({
  selector: 'app-record-access',
  templateUrl: './record-access.component.html',
  styleUrls: ['./record-access.component.sass']
})
export class RecordAccessComponent implements OnInit {
  @ViewChild(ProgressCardComponent) prgCard!: ProgressCardComponent
  doctors: DocWithAccessType[] = []

  constructor(private ps: PatientService) {
  }

  ngOnInit() {
    this.init()
  }

  init() {
    this.ps.getAllDoctors().then(r => {
      console.log(r)
      this.doctors = r
    })
  }

  getInput(input: Event) {
    return (input.target as HTMLInputElement).value
  }

  revokeAccess(id: string) {
    this.prgCard.setProgress('Revoking access to Record', 0)
    this.ps.revokeAccessToRecord(id).then(r => {
      console.log(r)
      this.prgCard.setProgress('Access Revoked', 1)
      this.init()
    }).catch(err => {
      this.prgCard.setProgress('Access Revoke Failed', 3)
    })
  }

  giveAccess(id: string) {
    this.prgCard.setProgress('Granting access to Record', 0)
    this.ps.grantAccessToRecord(id).then(r => {
      console.log(r)
      this.prgCard.setProgress('Access Granted', 1)
      this.init()
    }).catch(err => {
      this.prgCard.setProgress('Access Granting Failed', 3)
    })
  }
}
