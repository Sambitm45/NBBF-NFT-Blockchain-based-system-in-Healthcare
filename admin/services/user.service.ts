import {Injectable} from '@angular/core';
import {Web3Service} from "../../services/web3.service";
import {UserType} from "../../types/user.type";
import {IpfsService} from "../../services/ipfs.service";
import {SharedUserService} from "../../shared/services/shared-user.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  account: string | undefined

  constructor(private ws: Web3Service, private is: IpfsService, private sus: SharedUserService) {
    ws.account.subscribe((v: string) => {
      this.account = v
    })
  }

  getAllRmo(): Promise<UserType[]> {
    return new Promise<UserType[]>((resolve, reject) => {
      this.sus.getAllRmo().then(r => resolve(r)).catch(err => reject(err))
    })
  }

  getAllPatients(): Promise<UserType[]> {
    return new Promise<UserType[]>((resolve, reject) => {
      this.sus.getAllPatients().then(r => resolve(r)).catch(err => reject(err))
    })
  }

  getAllDoctors(): Promise<UserType[]> {
    return new Promise<UserType[]>((resolve, reject) => {
      this.sus.getAllDoctors().then(r => resolve(r)).catch(err => reject(err))
    })
  }

  verifyUser(id: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.ws.getEHRContract().then(c => {
        console.log(this.account)
        // verifyUser(address _id)
        c.methods['verifyUser'](id).send({from: this.account})
          .on('confirmation', (r: any) => {
            resolve(true)
          }).on('error', (err: any) => {
          reject(err)
        })

      })
    })
  }


  deactivateUser(id: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.ws.getEHRContract().then(c => {
        console.log(this.account)
        // deactivateUser(address _id)
        c.methods['deactivateUser'](id).send({from: this.account})
          .on('confirmation', (r: any) => {
            resolve(true)
          }).on('error', (err: any) => {
          reject(err)
        })

      })
    })
  }



}
