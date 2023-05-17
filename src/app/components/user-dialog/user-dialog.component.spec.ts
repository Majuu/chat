import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDialogComponent } from './user-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

describe('UserDialogComponent', () => {
  let component: UserDialogComponent;
  let fixture: ComponentFixture<UserDialogComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        BrowserAnimationsModule
          ],
      declarations: [ UserDialogComponent ]
    })
    .compileComponents();

    userService = TestBed.inject(UserService);
    fixture = TestBed.createComponent(UserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not add user to database if no userName was provided', () => {
    const addUserToDatabaseSpy = spyOn(userService, 'addUserToDatabase');

    component.addNewUser();
    expect(addUserToDatabaseSpy).not.toHaveBeenCalled();
  });

  it('should add user to database if userName was provided', () => {
    const addUserToDatabaseSpy = spyOn(userService, 'addUserToDatabase');
    const mockedUser: Partial<User> = {name: 'test user'};

    component.userForm.get('userName')?.setValue('test user');

    component.addNewUser();

    expect(addUserToDatabaseSpy).toHaveBeenCalledOnceWith(jasmine.objectContaining(mockedUser));

    userService.user$.subscribe(user => {
      expect(user).toEqual(jasmine.objectContaining(mockedUser));
    })
  });
});
