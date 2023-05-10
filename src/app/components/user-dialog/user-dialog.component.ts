import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private userService: UserService
    ) {}

    addNewUser(): void {
      this.userService.user = {id: uuidv4(), name: this.userName};
      this.userService.userActive = true;
    }
}
