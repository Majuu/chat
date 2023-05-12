import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _currentUser = new BehaviorSubject<User | null>(null);

  get user$(): BehaviorSubject<User | null> {
    return this._currentUser;
  }

  set user(user: User) {
    this._currentUser.next(user);
  }
}
