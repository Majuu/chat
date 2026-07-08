import { Component, ElementRef, OnInit, viewChild, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/models/chat.model';
import { User } from 'src/app/models/user.model';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatFormComponent } from '../chat-form/chat-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-chat-container',
    templateUrl: './chat-container.component.html',
    styleUrl: './chat-container.component.scss',
    imports: [MatCard, MatCardContent, ChatMessageComponent, MatCardActions, ChatFormComponent, AsyncPipe]
})
export class ChatContainerComponent implements OnInit {
  readonly chatRef = viewChild.required<ElementRef>('chatRef');

  private userService = inject(UserService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.messageService.listenToDatabaseChanges(this.scrollToBottom);
    this.userService.listenToDatabaseChanges();
  }

  get chatList$(): Observable<Chat[]> {
    return this.messageService.chats$;
  }

  onChatSubmit(msg: string): void {
    const chat = new Chat(uuidv4(), this.userService.user$.getValue() as User, msg, new Date().toString());
    this.messageService.onChatSubmit(chat);
  }

  scrollToBottom = (): void => {
    setTimeout(() => {
      try {
        this.chatRef().nativeElement.scrollTop = this.chatRef().nativeElement.scrollHeight;
      } catch { return; }
    }, 0)
  }
}
