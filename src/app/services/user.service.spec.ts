import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WsService } from './ws.service';
import { User } from '../models/user.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserService', () => {
  let service: UserService;
  let wsService: WsService;

  const mockedUser = new User('userId', 'userName');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule]
    });

    wsService = TestBed.inject(WsService);
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call addItem method in wsService on addUserToDatabase', () => {
    const addItemSpy = spyOn(wsService, 'addItem');

    service.addUserToDatabase(mockedUser);

    expect(addItemSpy).toHaveBeenCalledOnceWith('users', mockedUser);
  });

  it('should call listenToDatabaseChanges method in wsService', () => {
    const listenToDatabaseChangesSpy = spyOn(wsService, 'listenToDatabaseChanges');

    service.listenToDatabaseChanges();

    expect(listenToDatabaseChangesSpy).toHaveBeenCalledTimes(1);
  });

  it('should push new data to usersList', () => {
    const user1 = new User('1234', 'user1');
    const user2 = new User('54321', 'user2');

    const newMockedChats = {'11111' : user1, '22222': user2};

    service['_usersList'].next([mockedUser])
    service['lookForDuplicateUsersAndCreateUsersList'](newMockedChats);

    service['_usersList'].subscribe(usersList => {
      expect(usersList).toEqual([mockedUser, user1, user2]);
    });
  });
});
