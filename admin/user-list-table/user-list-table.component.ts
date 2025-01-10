import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserType} from "../../types/user.type";

@Component({
  selector: 'app-user-list-table',
  templateUrl: './user-list-table.component.html',
  styleUrls: ['./user-list-table.component.sass']
})
export class UserListTableComponent {

  @Input() users!: UserType[]
  @Input() title!: string
  @Output() verify: EventEmitter<string> = new EventEmitter<string>()
  @Output() deactivate: EventEmitter<string> = new EventEmitter<string>()

  getInput(input: Event) {
    return (input.target as HTMLInputElement).value
  }

  onVerify(id: string) {
    this.verify.emit(id)
  }

  onDeactivate(id: string) {
    this.deactivate.emit(id)
  }
}
