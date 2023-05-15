import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  userForm = this.fb.nonNullable.group({
    userName: ['', Validators.required]
  })

  constructor(
    private userService: UserService,
    private fb: FormBuilder
    ) {}

    addNewUser(): void {
      const userFormName: string | undefined = this.userForm.get('userName')?.value;
      if(userFormName) {
        const user = new User(uuidv4(), userFormName);
        this.userService.user = user;
        this.userService.addUserToDatabase(user);
      }
    }
}
