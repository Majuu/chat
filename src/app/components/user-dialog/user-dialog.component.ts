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
  userName = '';

  constructor(
    private userService: UserService,
    ) {}

    addNewUser(): void {
      const user = new User(uuidv4(), this.userName);
      this.userService.user = user;
      this.userService.addUserToDatabase(user);

    }
}
