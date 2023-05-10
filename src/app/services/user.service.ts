import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser!: User;

  get user(): User {
    return this.currentUser;
  }

  set user(user: User) {
    this.currentUser = user;
  }
}
