import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-user-dialog',
    templateUrl: './user-dialog.component.html',
    styleUrl: './user-dialog.component.scss',
    imports: [FormsModule, ReactiveFormsModule, CdkScrollable, MatDialogContent, MatFormField, MatInput, MatDialogActions, MatButton, MatDialogClose]
})
export class UserDialogComponent {
  private userService = inject(UserService);
  private fb = inject(FormBuilder);

  userForm = this.fb.nonNullable.group({
    userName: ['', Validators.required]
  })

    addNewUser(): void {
      const userFormName: string | undefined = this.userForm.get('userName')?.value;
      if(userFormName) {
        const user = new User(uuidv4(), userFormName);
        this.userService.user = user;
        this.userService.addUserToDatabase(user);
      }
    }
}
