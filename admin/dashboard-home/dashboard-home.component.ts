import {Component, OnInit} from '@angular/core';
import {AdminService} from "../services/admin.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'admin-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.sass']
})
export class DashboardHomeComponent implements OnInit {

  counts: number[] = []
  cartTitles: string[] = ['RMO', 'Doctor', 'Patient', 'Initial Analysis', 'Further Diagnosis Required']

  constructor(private as: AdminService) {
  }

  ngOnInit() {
    this.getAllCountsFromBC()
  }

  getAllCountsFromBC() {
    this.as.getAllCounts().then(r => {
      console.log(r)

      this.counts = r.map((c) => Number(c))
    })
  }

  protected readonly Title = Title;
}
