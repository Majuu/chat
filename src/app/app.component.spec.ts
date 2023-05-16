import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { UserService } from './services/user.service';
import { User } from './models/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component';
import { MatIconModule } from '@angular/material/icon';
import { WsService } from './services/ws.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let userService: UserService;
  let wsService: WsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
         MatSnackBarModule, MatDialogModule, MatFormFieldModule, BrowserAnimationsModule, FormsModule, MatCardModule, ReactiveFormsModule, MatIconModule],
      declarations: [
        AppComponent,
        ChatContainerComponent,
        ChatMessageComponent,
        UserDialogComponent,
        ChatFormComponent
      ],
    }).compileComponents();

    wsService = TestBed.inject(WsService);
    userService = TestBed.inject(UserService);
    userService.user = new User('testId', 'testName');
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should get the user from userService', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    component.user$.subscribe(user => {
      expect(user).toEqual(new User('testId', 'testName'));
    })
  });

  it('should call a function that deletes all data initially', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const componentSpy = spyOn<AppComponent>(component, 'initiallyClearAllData' as never);

    component.ngOnInit();
    expect(componentSpy).toHaveBeenCalled();
  });

  it('should call wsService clear methods on calling initiallyClearAllData method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const wsServiceSpy = spyOn(wsService, 'deleteItems').and.returnValue(of());

    component['initiallyClearAllData']();

    expect(wsServiceSpy).toHaveBeenCalledTimes(2);
    expect(wsServiceSpy).toHaveBeenCalledWith('chats');
    expect(wsServiceSpy).toHaveBeenCalledWith('users');
  })
});
