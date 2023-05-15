import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { WsService } from './ws.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _currentUser = new BehaviorSubject<User | null>(null);
  private _usersList = new BehaviorSubject<User[]>([]);

  constructor(private wsService: WsService, private _snackBar: MatSnackBar) { }

  private lookForDuplicateUsersAndCreateUsersList(data: {[key: string]: User}) {
    const users: User[] = [];
    const currentUsersList = this._usersList.getValue();
    for(const id in data) {
      if (!currentUsersList.map(user => user.id).includes(id)) {
        users.push(data[id]);
        this.openUserLoggedInSnackBar(data[id].name);
      }
    }
    currentUsersList.push(...users)
    this._usersList.next(Object.values(currentUsersList));
  }

  get user$(): BehaviorSubject<User | null> {
    return this._currentUser;
  }

  set user(user: User) {
    this._currentUser.next(user);
  }

  listenToDatabaseChanges(): void {
    this.wsService.listenToDatabaseChanges<User>('users', this.lookForDuplicateUsersAndCreateUsersList.bind(this))
  }

  addUserToDatabase(user: User): void {
    this.wsService.addItem('users', user);
  }

  openUserLoggedInSnackBar(userName: string): void {
    const msg = `${userName} has joined the chat`;
    this._snackBar.open(msg, undefined, {
      duration: 3000,
      panelClass: ['snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
