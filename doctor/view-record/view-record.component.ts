import {Component, OnInit, ViewChild} from '@angular/core';
import {DoctorService} from "../services/doctor.service";
import {UserType} from "../../types/user.type";
import {MappedMedicalRecordType} from "../../types/mapped-medical-record.type";
import {MedicalDiagnosisType} from "../../types/medical-diagnosis.type";
import {RecordModalComponent} from "../../shared/record-modal/record-modal.component";
import html2canvas from "html2canvas";
import {ProgressCardComponent} from "../../shared/progress-card/progress-card.component";

declare const window: any;

interface MilestoneNFTType {
  data: MappedMedicalRecordType,
  milestone: string,
  patient: string,
  dr: string
}

@Component({
  selector: 'app-view-record',
  templateUrl: './view-record.component.html',
  styleUrls: ['./view-record.component.sass']
})
export class ViewRecordComponent implements OnInit {
  @ViewChild(ProgressCardComponent) prgCard!: ProgressCardComponent
  @ViewChild(RecordModalComponent) recordModal!: RecordModalComponent

  patients: UserType[] = []
  selectedPatient!: UserType;

  medicalRecord!: { [id: string]: MappedMedicalRecordType[] }

  selectedPatientRecords!: MappedMedicalRecordType[]
  selectedDiagnosis!: MedicalDiagnosisType;
  showMileStoneModal: boolean = false;
  mileStone: string = '';

  selectedRecord!: MappedMedicalRecordType
  showMileStone: boolean = false;

  selectedNFTData!: MilestoneNFTType
  //   = {
  //   data: {
  //     tokenId: 1,
  //     mId: 0,
  //     date: 0,
  //     drId: '',
  //     record: {followup: '', medicines: [], tests: [], files: [], diagnosis: ''}
  //   },
  //   milestone: 'wvtgwert wetg wgh hf ghg gr dher thery hteyh erhyeryre yherter h rthertherth rth erth trhtr htrh rtherwev rtdsrg',
  //   dr: '0x3a55F9C68dbfFd0C698d6DF17FFfDAEA8fec99fE',
  //   patient: '0x3a55F9C68dbfFd0C698d6DF17FFfDAEA8fec99fE'
  // }
  nftAddress: string = ''
  selectedTokenId: number = 0

  constructor(private ds: DoctorService) {
  }

  ngOnInit() {
    this.getAllAssignedPatients()
  }

  getAllAssignedPatients() {
    this.ds.getDrAssignedPatients().then(r => {
      this.patients = r
    })
  }

  onViewRecord() {
    console.log(this.selectedPatient)
    this.getPatRecords()
  }

  getPatRecords() {
    if (this.medicalRecord?.[this.selectedPatient.id]) {
      this.selectedPatientRecords = this.medicalRecord[this.selectedPatient.id]
      return
    }
    this.ds.getPatientRecords(this.selectedPatient.id).then(r => {
      this.medicalRecord = {[this.selectedPatient.id]: r}
      this.selectedPatientRecords = r
      console.log(r)
    })
  }

  viewDiagnosis(d: MedicalDiagnosisType) {
    this.selectedDiagnosis = d
    this.recordModal.showDiagnosis = true
    console.log(this.selectedDiagnosis)
  }

  onAddNewMileStone(record: MappedMedicalRecordType) {
    this.selectedRecord = record
    this.showMileStoneModal = true

  }

  onViewMileStone(r: MappedMedicalRecordType) {
    console.log(r)
    this.showMileStone = true
    this.selectedTokenId = Number(r.tokenId)
    this.ds.getNFT(Number(r.tokenId))
      .then((d: { rr: MilestoneNFTType, n: string }) => {
        console.log(d)
        this.selectedNFTData = d.rr
        this.nftAddress = d.n
      })
  }

  downloadNFT() {
    let certDiv = document.getElementById('cert')
    html2canvas(certDiv as HTMLElement).then((canvas) => {
      // Convert the canvas to blob
      canvas.toBlob(function (blob) {
        // To download directly on browser default 'downloads' location
        let link = document.createElement("a");
        link.download = "image.png";
        link.href = URL.createObjectURL(blob as Blob);
        link.click();
        // To save manually somewhere in file explorer
        window.saveAs(blob, "NFT_image.png");


      }, 'image/png');
      this.showMileStone = false
    })
  }

  mintNFT() {
    this.prgCard.setProgress('Minting Milestone NFT', 0)
    this.ds.mintNewNFT(this.mileStone, this.selectedRecord, this.selectedPatient.id).then(r => {
      console.log(r)
      this.showMileStoneModal = false
      this.prgCard.setProgress('NFT Minted', 1)
      this.getPatRecords()
    }).catch(err => {
      this.prgCard.setProgress('NFT Minting failed', 3)
    })
  }
}
