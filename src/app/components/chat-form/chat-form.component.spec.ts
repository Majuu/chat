import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ChatFormComponent } from './chat-form.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

describe('ChatFormComponent', () => {
  let component: ChatFormComponent;
  let fixture: ComponentFixture<ChatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MatIconModule, ReactiveFormsModule, ChatFormComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ChatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should focus chatInput on init', fakeAsync(() => {
    const chatInputSpy = jest.spyOn(component.chatInput().nativeElement, 'focus');

    component.ngOnInit();
    tick(0);

    expect(chatInputSpy).toHaveBeenCalledTimes(1);

  }))

  it('should send the message, reset the form and focus chat input after submit', () => {
    const sendMessageSpy = jest.spyOn(component.sendMessage, 'emit');
    const formResetSpy = jest.spyOn(component.chatForm, 'reset');
    const chatInputSpy = jest.spyOn(component.chatInput().nativeElement, 'focus');

    component.chatForm.get('chatMessage')?.setValue('Test msg');

    component.submit();

    expect(sendMessageSpy).toHaveBeenCalledTimes(1);
    expect(sendMessageSpy).toHaveBeenCalledWith('Test msg');
    expect(formResetSpy).toHaveBeenCalledTimes(1);
    expect(chatInputSpy).toHaveBeenCalledTimes(1);
  })
});
