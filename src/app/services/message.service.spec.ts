import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Chat } from '../models/chat.model';
import { User } from '../models/user.model';
import { WsService } from './ws.service';

describe('MessageService', () => {
  let service: MessageService;
  let wsService: WsService;

  const mockedUser = new User('userId', 'testUser');
  const mockedDate = new Date().toString()
  const mockedChat = new Chat('testId', mockedUser, 'test msg', mockedDate);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    wsService = TestBed.inject(WsService);
    service = TestBed.inject(MessageService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get chat list', () => {
    service['_chats'].next([mockedChat]);

    service.chats$.subscribe(chatList => {
      expect(chatList).toEqual([mockedChat]);
    })
  });

  it('should call addItem method in wsService on ChatSubmit', () => {
    const addItemSpy = spyOn(wsService, 'addItem');

    service.onChatSubmit(mockedChat);

    expect(addItemSpy).toHaveBeenCalledOnceWith('chats', mockedChat);
  });

  it('should call listenToDatabaseChanges method in wsService', () => {
    const listenToDatabaseChangesSpy = spyOn(wsService, 'listenToDatabaseChanges');

    const scrollCbMock = () => {return;}

    service.listenToDatabaseChanges(scrollCbMock);

    expect(listenToDatabaseChangesSpy).toHaveBeenCalledTimes(1);
  });

  it('should sort the data, filter duplicates and update chat list', () => {
    const chat1 = new Chat('1234', mockedUser, 'msg123', mockedDate);
    const chat2 = new Chat('54321', mockedUser, 'msg54321', mockedDate);

    const newMockedChats = {'11111' : chat1, '22222': chat2};
    const mockedScrollCb: () => void = () => {return;}

    service['lookForDuplicatesAndSortChats'](newMockedChats, mockedScrollCb);

    service.chats$.subscribe(chatList => {
      expect(chatList).toEqual([chat1, chat2]);
    });
  });

  it('should just push new data to chatlist if the list is empty', () => {
    const chat1 = new Chat('1234', mockedUser, 'msg123', mockedDate);
    const chat2 = new Chat('54321', mockedUser, 'msg54321', mockedDate);

    service['_chats'].next([mockedChat]);

    const newMockedChats = {'11111' : chat1, '22222': chat2};
    const mockedScrollCb: () => void = () => {return;}

    service['lookForDuplicatesAndSortChats'](newMockedChats, mockedScrollCb);

    service.chats$.subscribe(chatList => {
      expect(chatList).toEqual([mockedChat, chat1, chat2]);
    });
  });
});
