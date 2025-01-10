import {Component, OnInit, ViewChild} from '@angular/core';
import {UserType} from "../../types/user.type";
import {UserService} from "../services/user.service";
import {ProgressCardComponent} from "../../shared/progress-card/progress-card.component";

@Component({
  selector: 'app-rmo',
  templateUrl: './rmo.component.html',
  styleUrls: ['./rmo.component.sass']
})
export class RmoComponent implements OnInit {
  @ViewChild(ProgressCardComponent) prgCard!: ProgressCardComponent

  rmo: UserType[] = []

  constructor(private us: UserService) {
    // this.rmo = []
  }

  ngOnInit() {
    this.getAllRmoFromBC()
  }

  verifyRMO(id: string) {
    this.prgCard.setProgress('Verifying RMO...', 0)
    this.us.verifyUser(id).then(r => {
      // console.log(r)
      this.prgCard.setProgress('RMO Verified', 1)
      this.getAllRmoFromBC()
    }).catch(err => {
      this.prgCard.setProgress('Verification failed', 3)
    })
  }

  getAllRmoFromBC() {
    this.us.getAllRmo().then(r => {
      console.log(r)
      this.rmo = r
    })
  }

  deactivateRMO(id:string){
    this.prgCard.setProgress('Deactivating RMO...', 0)
    this.us.deactivateUser(id).then(r => {
      // console.log(r)
      this.prgCard.setProgress('RMO Deactivated', 1)
      this.getAllRmoFromBC()
    }).catch(err => {
      this.prgCard.setProgress('Deactivation failed', 3)
    })
  }

}
