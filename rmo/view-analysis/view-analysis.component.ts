import {Component, OnInit, ViewChild} from '@angular/core';
import {RmoService} from "../services/rmo.service";
import {UserType} from "../../types/user.type";
import {AnalysisService} from "../services/analysis.service";
import {InitialAnalysisType} from "../../types/initial-analysis.type";
import {MrRecordType} from "../../types/mr-record.type";
import {LabFileType} from "../../types/lab-file.type";
import {formatBytes} from "../../shared/utills";
import {AnalysisModalComponent} from "../../shared/analysis-modal/analysis-modal.component";

interface AnalysisType {
  bc_data: MrRecordType,
  ia_data: InitialAnalysisType
}

@Component({
  selector: 'app-view-analysis',
  templateUrl: './view-analysis.component.html',
  styleUrls: ['./view-analysis.component.sass']
})
export class ViewAnalysisComponent implements OnInit {
  @ViewChild(AnalysisModalComponent) analysisModal!:AnalysisModalComponent

  patients: UserType[] = []

  showAnalysis: boolean = false

  patInitialAnalysis!: { [id: string]: AnalysisType }

  analysis !: AnalysisType

  constructor(private rs: RmoService, private as: AnalysisService) {
  }

  ngOnInit() {
    this.getPatients()
  }

  getPatients() {
    this.rs.getPatientsIADone().then(r => {
      console.log(r)
      this.patients = r
    })
  }

  getInput(input: Event) {
    return (input.target as HTMLInputElement).value
  }

  showDialog(p: UserType) {
    console.log(p)
    this.analysisModal.showAnalysis = true
    if (this.patInitialAnalysis?.[p.id]) {
      this.analysis = this.patInitialAnalysis[p.id]
      return
    }
    this.as.getAnalysisPatient(p.id).then((r: AnalysisType) => {
      console.log(r)
      this.patInitialAnalysis = {[p.id]: r}
      this.analysis = this.patInitialAnalysis[p.id]
      console.log(this.analysis)
    })
  }


  protected readonly formatBytes = formatBytes;
}
