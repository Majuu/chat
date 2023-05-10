import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  userName: string = '';

  constructor(
    private userService: UserService,
    ) {}

    addNewUser(): void {
      this.userService.user = new User(uuidv4(), this.userName);
      this.userService.userActive = true;
    }
}
