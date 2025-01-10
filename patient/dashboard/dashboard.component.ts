import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  navs = [
    // {title: 'Dashboard', icon: 'fa-solid fa-terminal', route: '/patient/dashboard', active: true},
    {title: 'View Records', icon: 'fa-solid fa-notes-medical', route: '/patient/view-record', active: false},
    {title: 'Record Access', icon: 'fa-solid fa-file-shield', route: '/patient/record-access', active: false}
  ]

  constructor(private router: Router) {
  }

  ngOnInit() {
    // this.router.navigate(['patient/dashboard']).then(r => {
    // })
    this.router.navigate(['patient/view-record'])
      .then(r => {
        this.handleRouteChange('/patient/view-record')
      })
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.handleRouteChange(ev.url)
      }
    })
  }

  handleRouteChange(route: string) {
    // console.log(route)
    this.navs.map((n, i) => {
      n.route === route ? n.active = true : n.active = false
    })
  }

  handleLogOut() {
    this.router.navigate([''])
  }
}
