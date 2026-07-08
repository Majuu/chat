import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatMessageComponent } from './chat-message.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';

describe('ChatMessageComponent', () => {
  let component: ChatMessageComponent;
  let fixture: ComponentFixture<ChatMessageComponent>;
  let userService: UserService;

  const mockedUser = new User('testId', 'testName');

  beforeEach(async () => {

    await TestBed.configureTestingModule({
    imports: [MatSnackBarModule, ChatMessageComponent],
    providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();

    userService = TestBed.inject(UserService);
    userService.user = mockedUser;
    fixture = TestBed.createComponent(ChatMessageComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('chats', []);
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
});
