import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  navs = [
    // {title: 'Dashboard', icon: 'fa-solid fa-terminal', route: '/doctor/dashboard', active: true},
    {title: 'Consult', icon: 'fa-solid fa-notes-medical', route: '/doctor/consult', active: false},
    {title: 'View Records', icon: 'fa-solid fa-file-shield', route: '/doctor/view-records', active: false}
  ]

  constructor(private router: Router) {
  }

  ngOnInit() {
    // this.router.navigate(['doctor/dashboard']).then(r => {
    // })
    this.router.navigate(['doctor/consult'])
      .then(r => {
        this.handleRouteChange('/doctor/consult')
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
