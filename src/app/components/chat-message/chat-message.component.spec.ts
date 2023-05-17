import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ChatMessageComponent } from './chat-message.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

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

  it('should call triggerLastItemAnimation on input changes', () => {
    const triggerLastItemAnimationSpy = spyOn(component, 'triggerLastItemAnimation' as never);

    component.ngOnChanges();

    expect(triggerLastItemAnimationSpy).toHaveBeenCalledTimes(1);
  })

  it('should reset animation', fakeAsync(() => {
    component['triggerLastItemAnimation']();

    expect(component.isLastItemOpen).toBe(false);
    tick(0);
    expect(component.isLastItemOpen).toBe(true);
  }));
});
