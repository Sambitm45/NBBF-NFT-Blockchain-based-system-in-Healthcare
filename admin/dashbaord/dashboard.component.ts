import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  navs = [
    {title: 'Dashboard', icon: 'fa-solid fa-terminal', route: '/admin/dashboard', active: true},
    {title: 'RMO', icon: 'fa-solid fa-hospital-user', route: '/admin/rmo', active: false},
    {title: 'Doctor', icon: 'fa-solid fa-user-doctor', route: '/admin/doctor', active: false},
    {title: 'Patient', icon: 'fa-solid fa-user-injured', route: '/admin/patient', active: false},
  ]

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.navigate(['admin/dashboard']).then(r => {
      this.handleRouteChange('/admin/dashboard')
    })
    // this.router.navigate(['admin/rmo']).then(r => {
    //   this.handleRouteChange('/admin/rmo')
    //   })
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.handleRouteChange(ev.url)
      }
    })
  }

  handleRouteChange(route: string) {
    this.navs.map((n, i) => {
      n.route === route ? n.active = true : n.active = false
    })
  }

  handleLogOut() {
    this.router.navigate([''])
  }
}
