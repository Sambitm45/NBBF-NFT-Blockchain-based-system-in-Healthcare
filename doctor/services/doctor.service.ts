import {Injectable} from '@angular/core';
import {Web3Service} from "../../services/web3.service";
import {SharedUserService} from "../../shared/services/shared-user.service";
import {UserType} from "../../types/user.type";
import {MrRecordType} from "../../types/mr-record.type";
import {InitialAnalysisType} from "../../types/initial-analysis.type";
import {MedicalDiagnosisType} from "../../types/medical-diagnosis.type";
import {IpfsService} from "../../services/ipfs.service";
import {MappedMedicalRecordType} from "../../types/mapped-medical-record.type";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  account: string = ''

  constructor(private ws: Web3Service, private sus: SharedUserService, private ipfs: IpfsService) {
    this.account = this.ws.account.getValue()
  }

  getDrAssignedPatients(): Promise<UserType[]> {
    let pats: UserType[] = []
    return new Promise((resolve, reject) => {
      this.ws.getEHRContract().then(c => {
        c.methods['getDocPats']().call({from: this.account}).then((r: any) => {
          console.log(r)
          if (r.length >= 1) {
            r.forEach((p: string, i: number) => {
              this.sus.getUser(p).then(u => {
                pats.push(u)
                if (pats.length === i + 1) resolve(pats)
              })
            })
          } else resolve(pats)
        }).catch((err: any) => {
          console.log(err)
          reject(err)
        })
      })
    })
  }

  addPatientRecord(data: MedicalDiagnosisType, pat: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.ws.getEHRContract().then(c => {
        c.methods['getPatMR'](pat).call().then((ad: string) => {
          this.ws.getMRContract(ad).then(async mrc => {
            // addRecord(address _drId, string memory _recordHash)
            if (data.files.length >= 1) {
              await this.sus.prepareFilesForIAAndDiagnose(data.files as File[]).then(r => {
                data.files = r
              })
            }
            this.ipfs.addJson(data).then(r => {
              mrc.methods['addRecord'](this.account, r.path)
                .send({from: this.account})
                .on('confirmation', (r: any) => {
                  console.log(r)
                  resolve(r)
                }).on('error', (err: any) => {
                console.log(err)
                reject(err)
              })
            })

          })
        })
      })

    })
  }

  checkDocAccessToRecord(pat: string) {
    return new Promise((resolve, reject) => {
      this.sus.checkDocAccessToPatRecord(pat, this.account)
        .then((r: any) => {
          console.log(r)
          resolve(r)
        }).catch((err: any) => {
        reject(err)
        console.log(err)
      })
    })
  }

  getAnalysisPatient(pat: string): Promise<{
    bc_data: MrRecordType,
    ia_data: InitialAnalysisType
  }> {
    return new Promise((resolve, reject) => {
      this.sus.getAnalysisByPatient(pat).then(r => {
        resolve(r)
      })
    })
  }

  getPatientRecords(pat: string): Promise<MappedMedicalRecordType[]> {
    return new Promise<MappedMedicalRecordType[]>((resolve, reject) => {
      this.sus.getMedicalRecordByPatient(pat).then(r => {
        console.log(r)
        resolve(r)
      })
    })
  }

  mintNewNFT(milestone: string, record: MappedMedicalRecordType, pat: string) {
    return new Promise((resolve, reject) => {
      this.ws.getEHRContract().then(c => {
        // mintNewNFT(address _ad, string memory _ipfs, uint _mId, address _pat)
        this.ipfs.addJson({milestone: milestone, data: record, patient: pat, dr: this.account})
          .then(i => {
            c.methods['mintNewNFT'](this.account, "http://localhost:8080/ipfs/" + i.path, record.mId, pat).send({from: this.account})
              .on('confirmation', (a: any, b: any) => {
                console.log(a)
                console.log(b)
                resolve(true)
              })
          })
      })
    })
  }

  getNFT(tokenId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ws.getEHRContract().then(c => {
        c.methods['getNFTByToken'](tokenId).call().then((r: string) => {
          console.log(r)
          this.ipfs.getJson(r.split('/')[4]).subscribe(rr => {
            c.methods['getNFTAddress']().call().then((n: string) => {
              console.log(rr)
              resolve({rr, n})
            })

          })
        })
      })
    })
  }
}
