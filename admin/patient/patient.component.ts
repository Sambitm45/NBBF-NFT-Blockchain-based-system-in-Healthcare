import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../services/user.service";
import {UserType} from "../../types/user.type";
import {ProgressCardComponent} from "../../shared/progress-card/progress-card.component";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.sass']
})
export class PatientComponent implements OnInit {
  @ViewChild(ProgressCardComponent) prgCard!: ProgressCardComponent

  patients: UserType[] = []

  constructor(private us: UserService) {
  }

  ngOnInit() {
    this.getAllPatients()
  }

  getAllPatients() {

    this.us.getAllPatients().then(r => {
      // console.log(r)

      this.patients = r
    })
  }


  verifyPatient(id: string) {
    this.prgCard.setProgress('Verifying Patient...', 0)
    this.us.verifyUser(id).then(r => {
      // console.log(r)
      this.prgCard.setProgress('Patient Verified', 1)
      this.getAllPatients()
    }).catch(err => {
      this.prgCard.setProgress('Verification failed', 3)
    })
  }

  deactivatePatient(id: string) {
    this.prgCard.setProgress('Deactivating Patient...', 0)
    this.us.deactivateUser(id).then(r => {
      // console.log(r)
      this.prgCard.setProgress('Patient Deactivated', 1)
      this.getAllPatients()
    }).catch(err => {
      this.prgCard.setProgress('Deactivation failed', 3)
    })
  }
}
