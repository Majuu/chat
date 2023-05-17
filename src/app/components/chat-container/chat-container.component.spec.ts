import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatContainerComponent } from './chat-container.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatFormComponent } from '../chat-form/chat-form.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { Chat } from 'src/app/models/chat.model';

describe('ChatContainerComponent', () => {
  let component: ChatContainerComponent;
  let fixture: ComponentFixture<ChatContainerComponent>;
  let userService: UserService;
  let messageService: MessageService;

  const mockedUser: User = new User('testId', 'testName');
  const mockedChat: Chat = new Chat('testChatId', mockedUser, 'test message', '1234');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, MatCardModule, MatIconModule, BrowserAnimationsModule, ReactiveFormsModule],
      declarations: [ ChatContainerComponent, ChatMessageComponent, ChatFormComponent],
    })
    .compileComponents();

    messageService = TestBed.inject(MessageService);
    messageService['_chats'].next([mockedChat]);

    userService = TestBed.inject(UserService);
    userService.user = mockedUser;

    fixture = TestBed.createComponent(ChatContainerComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call message and user services on init', () => {
    const userServiceSpy = spyOn(userService, 'listenToDatabaseChanges');
    const messageServiceSpy = spyOn(messageService, 'listenToDatabaseChanges');

    component.ngOnInit();

    expect(userServiceSpy).toHaveBeenCalledTimes(1);
    expect(messageServiceSpy).toHaveBeenCalledOnceWith(component.scrollToBottom);
  });

  it('should return chat list', () => {
    component.chatList$.subscribe(res => {
      expect(res).toEqual([mockedChat])
    })
  });

  it('should construct and send chat on submit', () => {
    const messageServiceSpy = spyOn(messageService, 'onChatSubmit');
    const mockedChatResult: Partial<Chat> = {message: 'test msg', timestamp: new Date().toString(), user: mockedUser};

    component.onChatSubmit('test msg');

    expect(messageServiceSpy).toHaveBeenCalledTimes(1);
    expect(messageServiceSpy).toHaveBeenCalledWith(jasmine.objectContaining(mockedChatResult));
  });
});
