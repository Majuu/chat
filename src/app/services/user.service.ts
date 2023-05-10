import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser!: User;
  private isUserProvided$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get user(): User {
    return this.currentUser;
  }

  set user(user: User) {
    this.currentUser = user;
  }

  get userActive$(): BehaviorSubject<boolean> {
    return this.isUserProvided$;
  }

  set userActive(isActive: boolean) {
    this.isUserProvided$.next(isActive);
  }
}
