import {Component, OnInit, ViewChild} from '@angular/core';
import {UserType} from "../../types/user.type";
import {UserService} from "../services/user.service";
import {ProgressCardComponent} from "../../shared/progress-card/progress-card.component";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.sass']
})
export class DoctorComponent implements OnInit {
  @ViewChild(ProgressCardComponent) prgCard!: ProgressCardComponent

  doctors: UserType[] = []

  constructor(private us: UserService) {
  }

  ngOnInit() {
    this.getAllDoctors()
  }

  getAllDoctors() {
    this.us.getAllDoctors().then(r => {
      // console.log(r)
      this.doctors = r
    })
  }


  verifyDoctor(id: string) {
    this.prgCard.setProgress('Verifying Doctor...', 0)
    this.us.verifyUser(id).then(r => {
      // console.log(r)
      this.prgCard.setProgress('Doctor Verified', 1)
      this.getAllDoctors()
    }).catch(err=>{
      this.prgCard.setProgress('Verification failed', 3)
    })
  }

  deactivateDoctor(id:string) {
    this.prgCard.setProgress('Deactivating Doctor...', 0)
    this.us.deactivateUser(id).then(r => {
      // console.log(r)
      this.prgCard.setProgress('Doctor Deactivated', 1)
      this.getAllDoctors()
    }).catch(err=>{
      this.prgCard.setProgress('Deactivation failed', 3)
    })
  }
}
