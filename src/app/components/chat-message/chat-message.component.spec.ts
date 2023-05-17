import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ChatMessageComponent } from './chat-message.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { SimpleChanges } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';

describe('ChatMessageComponent', () => {
  let component: ChatMessageComponent;
  let fixture: ComponentFixture<ChatMessageComponent>;
  let userService: UserService;

  const mockedUser = new User('testId', 'testName');

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      declarations: [ ChatMessageComponent ],
    })
    .compileComponents();

    userService = TestBed.inject(UserService);
    userService.user = mockedUser;
    fixture = TestBed.createComponent(ChatMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user and set author userName on init', () => {

    component.ngOnInit();

    expect(component.user).toEqual(mockedUser);
    expect(component.authorUserName).toEqual(`You (testName)`)
  });

  describe('onChanges', () => {
    it('should return if it is a first change', () => {
      const simpleChanges: SimpleChanges = {chats: {firstChange: true, currentValue: [], previousValue: [], isFirstChange: () => true}};
      component.ngOnChanges(simpleChanges);

      expect(component.initialLoadCompleted).toBe(false);
      expect(component.firstAnimationShouldBeFired).toBe(false);
    });

    it('should trigger animation after initial data loading is completed', () => {
      const simpleChanges: SimpleChanges = {chats: {firstChange: false, currentValue: [], previousValue: [], isFirstChange: () => true}};
      component.initialLoadCompleted = true;

      const triggerAnimationSpy = spyOn(component, 'triggerLastItemAnimation' as never);

      component.ngOnChanges(simpleChanges);

      expect(component.firstAnimationShouldBeFired).toBe(true);
      expect(triggerAnimationSpy).toHaveBeenCalledTimes(1);
    })

    it('should handle data loading and animation on input changes', () => {
      const simpleChanges: SimpleChanges = {chats: {firstChange: false, currentValue: [], previousValue: [], isFirstChange: () => true}};
      component.chats = [new Chat('testId', mockedUser, 'testMsg', new Date().toString())];

      component.ngOnChanges(simpleChanges);

      expect(component.initialLoadCompleted).toBe(true);
      expect(component.firstAnimationShouldBeFired).toBe(false);
    });
  })

  it('should reset animation', fakeAsync(() => {
    component['triggerLastItemAnimation']();

    expect(component.isLastItemOpen).toBe(false);
    tick(0);
    expect(component.isLastItemOpen).toBe(true);
  }));
});
