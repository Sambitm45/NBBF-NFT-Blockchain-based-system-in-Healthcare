import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {UserType} from "../../types/user.type";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ProgressCardComponent} from "../../shared/progress-card/progress-card.component";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.sass']
})
export class AuthenticationComponent implements OnInit {
  @ViewChild(ProgressCardComponent) prgCard!: ProgressCardComponent
  @ViewChild('regForm') regForm!: HTMLFormElement
  @ViewChild('loginForm') loginForm!: HTMLFormElement

  user: UserType = {
    age: 23,
    email: "user@gmail.com",
    id: "",
    name: "user",
    password: "admin",
    phone: "7986352897",
    blood: 'B+'
  }

  userType: {
    admin: boolean;
    rmo: boolean;
    patient: boolean;
    doctor: boolean;
  } = {
    admin: true,
    rmo: false,
    patient: false,
    doctor: false
  }

  isRegister: boolean = false;
  isLogin: boolean = true;
  password: string = 'admin'
  rPassword: string = '';

  userTypeId: number = 0

  userId: string = ''

  constructor(private as: AuthService, private router: Router, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.setAccount()
  }

  setAccount() {
    // console.log(this.userId)
    if (this.userId === '')
      this.as.accountSubject.subscribe(r => {
        // console.log(r)
        this.user.id = r
        this.userId = r
        this.cd.detectChanges()
      })
    else {
      this.user.id = this.userId
    }
  }

  register() {
    this.isRegister = true
    this.isLogin = false
    if (this.userTypeId === 1)
      this.onUserToggle(2)
  }

  login() {
    this.isLogin = true
    this.isRegister = false
  }

  onUserToggle(number: number) {
    this.errorMsg = ''
    this.successMsg = ''
    this.userTypeId = number - 1;
    switch (number) {
      case 1:
        this.userType.admin = true
        this.userType.rmo = false
        this.userType.doctor = false
        this.userType.patient = false
        break;
      case 2:
        this.userType.admin = false
        this.userType.rmo = true
        this.userType.doctor = false
        this.userType.patient = false
        break;
      case 3:
        this.userType.admin = false
        this.userType.rmo = false
        this.userType.doctor = true
        this.userType.patient = false
        break;
      case 4:
        this.userType.admin = false
        this.userType.rmo = false
        this.userType.doctor = false
        this.userType.patient = true
        break;
    }
  }

  //  isAdmin 100
//  incorrect admin password 101
//  user 200
//  incorrect user password 201
//  user not active 202
  errorMsg: string = '';
  successMsg: string = '';

  handleLogin() {
    this.prgCard.setProgress('Authenticating...', 1)
    console.log(this.user)
    this.errorMsg = ''
    this.user.password = this.password
    this.as.login({id: this.user.id, password: this.user.password || ''}).then(r => {
      console.log(this.userTypeId === undefined && Number(r) != 100 || Number(r) != 101)
      // if (this.userTypeId === undefined && Number(r) in [100,101]) {
      //   this.errorMsg = 'Not connected as admin'
      //   return
      // }
      //
      // console.log(this.userTypeId,this.userTypeId in [1,2,3] , (Number(r) in [100,101]))
      // if (this.userTypeId !== 0 && Number(r) in [100,101]) {
      //   this.errorMsg = `Not connected as ${this.userTypeId === 1 ? 'RMO' : this.userTypeId === 2 ? 'Doctor' : 'Patient'}`
      //   return;
      // }

      if (Number(r) === 500) {
        this.prgCard.setProgress('Non Registered User', 3)
        return
      }

      if (this.userTypeId === 0) {
        if (Number(r) === 100) {
          this.router.navigate(['admin/']).then(r => {
          })
        } else if (Number(r) === 101) {
          this.prgCard.setProgress('Incorrect Password', 3)
        } else {
          this.prgCard.setProgress('Invalid id', 3)
        }
        return;
      } else if (this.userTypeId === 1) {
        if (Number(r) === 200) {
          this.router.navigate(['rmo/']).then(r => {
          })
        } else if (Number(r) === 201) {
          this.prgCard.setProgress('Incorrect Password', 3)

        } else if (Number(r) === 202) {
          this.prgCard.setProgress('Non Verified User', 3)

        } else {
          this.prgCard.setProgress('Invalid id', 3)
        }
        return;
      } else if (this.userTypeId === 2) {
        if (Number(r) === 300) {
          this.router.navigate(['doctor/']).then(r => {
          })
        } else if (Number(r) === 201) {
          this.prgCard.setProgress('Incorrect Password', 3)

        } else if (Number(r) === 202) {
          this.prgCard.setProgress('Non Verified User', 3)

        } else {
          this.prgCard.setProgress('Invalid id', 3)
        }
        return;
      } else if (this.userTypeId === 3) {
        if (Number(r) === 400) {
          this.router.navigate(['patient/']).then(r => {
          })
        } else if (Number(r) === 201) {
          this.prgCard.setProgress('Incorrect Password', 3)
        } else if (Number(r) === 202) {
          this.prgCard.setProgress('Non Verified User', 3)

        } else {
          this.prgCard.setProgress('Invalid id', 3)
        }
        return;
      } else if (Number(r) === 201) {
        this.prgCard.setProgress('Incorrect Password', 3)

      } else if (Number(r) === 202) {
        this.prgCard.setProgress('Non Verified User', 3)
      }

    })
    this.clearForm()
  }

  handleRegister() {
    this.prgCard.setProgress('Registering new User', 0)
    this.user.password = this.password
    console.log(this.userTypeId)
    this.errorMsg = ""
    console.log(this.user, this.rPassword, this.userTypeId)
    this.as.userRegistration(this.user, this.userTypeId).then(r => {

      this.successMsg = 'Registration successful'
      this.prgCard.setProgress('Registration successful', 1)

      this.clearForm()
    }).catch(err => {
      this.errorMsg = 'Registration failed'
      this.prgCard.setProgress('Registration failed', 3)
    })
  }

  clearForm() {
    // this.regForm.reset()
    // this.loginForm.reset()
    // this.setAccount()
  }
}
