import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { WsService } from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _currentUser = new BehaviorSubject<User | null>(null);
  private _usersList = new BehaviorSubject<User[]>([]);

  constructor(private wsService: WsService) { }

  private lookForDuplicateUsersAndCreateUsersList(data: {[key: string]: User}) {
    const users: User[] = [];
    let currentUsersList = this._usersList.getValue();
    for(const id in data) {
      if (!currentUsersList.map(user => user.id).includes(id)) {
        users.push(data[id]);
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
}
