import {Injectable} from '@angular/core';
import Web3 from "web3";
import {BehaviorSubject} from "rxjs";
import EHR_Contract from '../assets/contracts/EHR.json'
import MR_Contract from '../assets/contracts/MedicalRecord.json'

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  web3!: Web3
  account: BehaviorSubject<string> = new BehaviorSubject<string>('');
  contract!: any

  constructor() {
    this.getWeb3Provider().then(w3 => {
      this.getEHRContract().then(c => {
        console.log(c)
      })

      window?.ethereum?.on('accountsChanged', (acc: any) => {
        console.log(acc);
        this.account.next((acc as string[])?.[0])
        console.log(this.account)
        window.location.reload();
      });
    })
  }

  getEHRContract(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.contract) {
        resolve(this.contract)
      } else {
        const nwData = EHR_Contract.networks[5777]
        if (nwData) {
          this.contract = new this.web3.eth.Contract(EHR_Contract.abi as any, nwData.address)
          resolve(this.contract)
        }
      }
    })
  }

  getMRContract(ad: string): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(new this.web3.eth.Contract(MR_Contract.abi as any, ad))
    })
  }

  async getWeb3Provider() {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log(accounts)
      this.account.next((accounts as string[])?.[0])
      return this.web3;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      return window.web3;
    } else {
      return window.web3;
    }
  }

  get currentAccount() {
    return this.account.getValue();
  }

}
