import {Component, OnInit, ViewChild} from '@angular/core';
import {UserType} from "../../types/user.type";
import {InitialAnalysisType} from "../../types/initial-analysis.type";
import {AnalysisService} from "../services/analysis.service";
import {RmoService} from "../services/rmo.service";
import {formatBytes} from "../../shared/utills";
import {ProgressCardComponent} from "../../shared/progress-card/progress-card.component";

interface FDRType {
  label: string,
  value: string
}

@Component({
  selector: 'app-initial-analysis',
  templateUrl: './initial-analysis.component.html',
  styleUrls: ['./initial-analysis.component.sass']
})
export class InitialAnalysisComponent implements OnInit {
  @ViewChild(ProgressCardComponent) prgCard!: ProgressCardComponent
  @ViewChild('analysisForm') form!: HTMLFormElement

  patients: UserType[] = []
  doctors: UserType[] = []

  selectedPatient!: UserType
  selectedDoctor!: UserType

  predictImage: File | null = null

  initialAnalysis: InitialAnalysisType = {
    diagnosis: "", doctor: undefined, fdr: 'false', files: [], patient: undefined
  }

  fdrOptions: FDRType[] = [
    {label: 'Further Diagnosis Required', value: 'true'},
    {label: 'No Further Diagnosis Required', value: 'false'}
  ]

  selectedFiles: File[] = []

  predicting: boolean = false;

  constructor(private as: AnalysisService, private rs: RmoService) {
  }

  ngOnInit() {
    this.rs.getPatients().then(r => this.patients = r)
    this.rs.getDoctors().then(r => this.doctors = r)
  }

  onFilesSelected(event: Event) {
    console.log()
    let files: FileList = (event.target as HTMLInputElement).files as FileList
    for (let i = 0; i < files.length; i++) {
      if (files.item(i) != null)
        this.selectedFiles.push(files.item(i) as File)
    }
  }

  onFileDrop(event: FileList) {
    console.log(event)
    for (let i = 0; i < event.length; i++) {
      if (event.item(i) != null)
        this.selectedFiles.push(event.item(i) as File)
    }
  }

  onInitialAnalysisSubmit() {
    this.prgCard.setProgress('Submitting Initial Analysis', 0)
    console.log('submitting...')
    delete this.selectedPatient?.["password"]
    delete this.selectedDoctor?.["password"]

    this.initialAnalysis.patient = this.selectedPatient
    this.initialAnalysis.doctor = this.selectedDoctor
    this.initialAnalysis.files = this.selectedFiles
    console.log(this.initialAnalysis)
    if (!this.initialAnalysis.patient?.id) {
      this.prgCard.setProgress('Select a Patient', 3)
      return;
    }
    if (this.initialAnalysis.diagnosis === '') {
      this.prgCard.setProgress('Diagnosis shouldn\'t be empty', 3)
      return;
    }
    if (this.initialAnalysis.fdr === 'true' && this.initialAnalysis.doctor?.id === '') {
      this.prgCard.setProgress('Select a Doctor', 3)
      return;
    }
    if (this.initialAnalysis.files.length < 1) {
      this.prgCard.setProgress('Select at-least one medical file', 3)
      return;
    }

    if (this.initialAnalysis.fdr != 'true') {
      this.initialAnalysis.doctor = {
        active: false,
        age: 0,
        blood: "",
        email: "",
        id: "0x0000000000000000000000000000000000000000",
        name: "",
        password: "",
        phone: ""
      }
    }

    this.as.newInitialAnalysis(this.initialAnalysis).then(r => {
      console.log(r)
      this.prgCard.setProgress('Initial Analysis Done', 1)
      this.reset()
      this.selectedFiles = []
    }).catch(err => {
      this.prgCard.setProgress('Initial Analysis Failed', 3)
    })
  }

  reset() {
    this.form.reset()
    this.initialAnalysis.fdr = 'false'
  }

  protected readonly formatBytes = formatBytes;

}
