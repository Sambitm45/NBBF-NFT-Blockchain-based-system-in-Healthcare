import {Injectable} from '@angular/core';
import {Web3Service} from "../../services/web3.service";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private ws: Web3Service) {
  }

  getAllCounts() {
    return new Promise<number[]>((resolve, reject) => {
      this.ws.getEHRContract().then(c => {
        // getAllCounts()
        c.methods['getAllCounts']().call().then((r: []) => {
          //   return ([all_rmo.length, doctors.length, patients.length, iACount, fdrCount]);
          console.log(r)
          resolve(r)
        })
      })
    })
  }
}
