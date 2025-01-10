import {Injectable} from '@angular/core';
import {Web3Service} from "./web3.service";
import {LoginType} from "../types/login.type";
import {BehaviorSubject} from "rxjs";
import {UserType} from "../types/user.type";
import {IpfsService} from "./ipfs.service";
import {AddIPFSResultType} from "../types/add-ipfs-result.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  account: string | undefined

  accountSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private ws: Web3Service, private is: IpfsService) {
    this.accountSubject = ws.account
    this.account = ws.account.getValue()
    ws.account.subscribe((v: string) => {
      this.account = v
    })
  }

  login(data: LoginType): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.ws.getEHRContract().then(c => {
        // @ts-ignore
        c.methods['userLogin'](data.id, data.password)
          .call({from: this.account})
          .then((r: any) => {
            console.log(r)
            resolve(r)
          }).catch((err: any) => {
          console.log(err)
        })
      })
    })
  }

  userRegistration(data: UserType, userType: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.ws.getEHRContract().then(c => {
        let pwd = data.password
        delete data['password']
        this.is.addJson(data).then((r: AddIPFSResultType) => {
          console.log(r.path, userType, pwd, 'account:' + this.account)
          // addUser(string memory _hash, uint _u_type, string memory _pass)
          // @ts-ignore
          c.methods['addUser'](r.path, userType, pwd)
            .send({
              from: this.account
            })
            .on('confirmation', (r: any) => {
              console.log(r)
              resolve('registration completed successfully')
            })
            .on('error', (err: any) => {
              console.log(err)
              reject(err.message)
            })
        }, error => {
          console.log(error)
        })

      })
    })
  }
}
