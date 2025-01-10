import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Web3Service} from "../services/web3.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  account: string = ''
  currentAcc: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor(private web3: Web3Service, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.currentAcc = this.web3.account
    this.web3.account.subscribe(value => {
      console.log(value)
      this.currentAccount = value
      this.cd.detectChanges()
    })
  }

  get currentAccount() {
    return this.account
  }

  set currentAccount(acc) {
    this.account = acc
  }
}
